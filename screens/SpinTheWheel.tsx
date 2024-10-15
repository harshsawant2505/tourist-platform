import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text as RNText, Dimensions, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import Svg, { Path, G, Text } from 'react-native-svg';
import NetInfo from '@react-native-community/netinfo';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');
import * as Location from 'expo-location';
import { fetchAttractions } from '../utils/fetchSpots';

const numberOfSegments = 10;
const wheelSize = width * 0.95;
const fontSize = 18;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });

const makeWheel = (activityTitles:any) => {
  const data:any = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: 'dark',
    count: numberOfSegments
  });

  return arcs.map((arc:any, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);

    return {
      path: instance(arc),
      color: colors[index],
      title: activityTitles[index] || '',
      centroid: instance.centroid(arc),
    };
  });
};

const SpinningWheel = ({ route }:any) => {
  const { stateName } = route.params;

  const [closestAttractions, setClosestAttractions] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [location, setLocation] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(null); // Network connectivity state

  const GetClosestAttractions = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('closestAttractions');
      if (jsonValue != null) {
        setClosestAttractions(JSON.parse(jsonValue));
        setLoading(false);  // Stop loading once data is fetched
      }
    } catch (error) {
      console.error('Error fetching closest attractions from storage:', error);
      setLoading(false);  // Stop loading in case of an error
    }
  };

  const SaveAttractionsToStorage = async (data:any) => {
    console.log("Data: ", data)
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('closestAttractions', jsonValue);
      
    } catch (error) {
      console.error('Error saving closest attractions to storage:', error);
    }
  };

  const getLATLONG = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location:any = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const fetchDataAndAttractions = async () => {
    if (isConnected === false) {
      // If offline, load data from AsyncStorage
      GetClosestAttractions();
    } else if (location?.coords?.latitude && location?.coords?.longitude) {
      try {
        const attractions = await fetchAttractions(location.coords.latitude, location.coords.longitude);
        
        setClosestAttractions(attractions);  // Set new attractions data
        SaveAttractionsToStorage(attractions);  // Save new data to AsyncStorage
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attractions:', error);
        setLoading(false);  // Stop loading in case of an error
      }
    } else {
      console.log("Location not available, cannot fetch attractions.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const checkConnectionAndFetchData = async () => {
        const state:any = await NetInfo.fetch();
        setIsConnected(state.isConnected);

        if (!location) {
          await getLATLONG();
        }

        await fetchDataAndAttractions();
      };

      checkConnectionAndFetchData();

      return () => {
        console.log('Screen is unfocused');
      };
    }, [location, isConnected])  // Dependency array
  );

  const activityTitles = closestAttractions.map((attraction:any) => attraction.name);
  const wheelPaths = makeWheel(activityTitles);

  const [enabled, setEnabled] = useState(true);
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState(null);
  const angle = useRef(new Animated.Value(0)).current;
  const currentAngle = useRef(0);

  useEffect(() => {
    angle.addListener((event) => {
      currentAngle.current = event.value;
    });

    return () => {
      angle.removeAllListeners();
    };
  }, [angle]);

  const getWinnerIndex = useCallback(() => {
    const normalizedAngle = ((currentAngle.current % oneTurn) + oneTurn) % oneTurn;
    const index = (numberOfSegments - 1) - Math.floor(normalizedAngle / angleBySegment);
    return ((index) % numberOfSegments + 1) % numberOfSegments;
  }, []);

  const spinWheel = useCallback(() => {
    const velocity = 5000 + Math.random() * 5000;
    setEnabled(false);
    setFinished(false);
    setWinner(null);

    Animated.decay(angle, {
      velocity: velocity / 1000,
      deceleration: 0.999,
      useNativeDriver: true,
    }).start(() => {
      angle.setValue(currentAngle.current % oneTurn);
      const snapTo = snap(oneTurn / numberOfSegments);
      Animated.timing(angle, {
        toValue: snapTo(currentAngle.current),
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        const winnerIndex = getWinnerIndex();
        setWinner(wheelPaths[winnerIndex].title);
        setEnabled(true);
        setFinished(true);
      });
    });
  }, [angle, getWinnerIndex, wheelPaths]);

  const resetWheel = useCallback(() => {
    setFinished(false);
    setWinner(null);
  }, []);

  const renderKnob = useCallback(() => {
    const knobSize = 30;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(angle, angleOffset), oneTurn),
        new Animated.Value(angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: 'flex-end',
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: ['0deg', '0deg', '35deg', '-35deg', '0deg', '0deg'],
              }),
            },
          ],
        }}
      >
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox="0 0 57 100"
          style={{ transform: [{ translateY: 8 }] }}
        >
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  }, [angle]);

  const renderSvgWheel = useCallback(() => {
    return (
      <View style={styles.container}>
        <RNText style={styles.heading}>Activity Picker</RNText>
        {renderKnob()}
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                rotate: angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`],
                }),
              },
            ],
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path as any} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments}
                      origin={`${x}, ${y}`}
                    >
                      <Text
                        x={x}
                        y={y - 30}
                        fill="white"
                        textAnchor="middle"
                        fontSize={fontSize}
                      >
                        {arc.title}
                      </Text>
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
    );
  }, [angle, renderKnob, wheelPaths]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="purple" />
        <RNText style={styles.loadingText}>Loading attractions...</RNText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        {renderSvgWheel()}
        {finished && (
          <RNText style={styles.winnerText} onPress={resetWheel}>
            The activity is: {winner}
          </RNText>
        )}
      </View>

      <TouchableOpacity
        style={styles.spinButton}
        onPress={spinWheel}
        disabled={!enabled}
      >
        <RNText style={styles.spinButtonText}>Spin the Wheel</RNText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  winnerText: {
    fontSize: 20,
    position: 'absolute',
    bottom: 100,
    zIndex: 2,
    color: 'black',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
  },
  spinButton: {
    backgroundColor: 'purple',
    padding: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  spinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: 'purple',
  },
});

export default SpinningWheel;
