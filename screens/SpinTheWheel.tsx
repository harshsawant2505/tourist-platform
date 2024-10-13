import React from 'react';
import {
  StyleSheet,
  View,
  Text as RNText,
  Dimensions,
  Animated
} from 'react-native';
import activitiesData from '../JSON-files/activitiesDataset.json'; // Importing your JSON file
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path, G, Text } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';

const { width } = Dimensions.get('screen');

const numberOfSegments = 5; // Fixed at 5 based on activities
const wheelSize = width * 0.95;
const fontSize = 18;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });

// Fetch activities from props based on state name
const getActivitiesByState = (stateName) => {
  const stateData = activitiesData[stateName];
  if (stateData && stateData.activities) {
    return stateData.activities.map(activity => activity.title);
  }
  return [];
};

// Updated wheel function
const makeWheel = (activityTitles) => {
  const data = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: 'dark',
    count: numberOfSegments
  });

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);

    return {
      path: instance(arc),
      color: colors[index],
      title: activityTitles[index] || '',  // Set the activity title here
      centroid: instance.centroid(arc)
    };
  });
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props; // Destructure route from props
    const { stateName } = route.params; // Destructure stateName from route.params
    const activityTitles = getActivitiesByState(stateName); // Fetch activities

    this._wheelPaths = makeWheel(activityTitles);
    this._angle = new Animated.Value(0);
    this.angle = 0;

    this.state = {
      enabled: true,
      finished: false,
      winner: null
    };
  }

  componentDidMount() {
    this._angle.addListener(event => {
      this.angle = event.value;
    });
  }

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % oneTurn));
    return Math.floor(deg / angleBySegment);
  };

  _onPan = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { velocityY } = nativeEvent;

      this.setState({ enabled: false });

      Animated.decay(this._angle, {
        velocity: velocityY / 1000,
        deceleration: 0.999,
        useNativeDriver: true
      }).start(() => {
        this._angle.setValue(this.angle % oneTurn);
        const snapTo = snap(oneTurn / numberOfSegments);
        Animated.timing(this._angle, {
          toValue: snapTo(this.angle),
          duration: 300,
          useNativeDriver: true
        }).start(() => {
          const winnerIndex = this._getWinnerIndex();
          this.setState({
            enabled: true,
            finished: true,
            winner: this._wheelPaths[winnerIndex].title // Set winner to the title
          });
        });
      });
    }
  };

  _resetWheel = () => {
    this.setState({ finished: false, winner: null });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Activity Suggester</Text>{/* Added Title */}
        <PanGestureHandler
          onHandlerStateChange={this._onPan}
          enabled={this.state.enabled}
        >
          <View style={styles.wheelContainer}>
            {this._renderSvgWheel()}
            {this.state.finished && this._renderWinner()}
          </View>
        </PanGestureHandler>
      </View>
    );
  }

  _renderKnob = () => {
    const knobSize = 30;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, angleOffset), oneTurn),
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
                outputRange: ['0deg', '0deg', '35deg', '-35deg', '0deg', '0deg']
              })
            }
          ]
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
  };

  _renderWinner = () => {
    return (
      <RNText style={styles.winnerText} onPress={this._resetWheel}>
        The activity is: {this.state.winner} 
      </RNText>
    );
  };

  _renderSvgWheel = () => {
    return (
      <View style={styles.container}>
        {this._renderKnob()}
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                rotate: this._angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`]
                })
              }
            ]
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {this._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;

                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                      origin={`${x}, ${y}`}
                    >
                      <Text
                        x={x}
                        y={y - 30}
                        fill="white"
                        textAnchor="middle"
                        fontSize={fontSize}
                      >
                        {arc.title} {/* Activity title from JSON */}
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
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24, // Increased font size for better visibility
    fontWeight: 'bold',
    marginBottom: 20, // Added margin for spacing
    color: 'black',
  },
  winnerText: {
    fontSize: 20,
    position: 'absolute',
    bottom: 50,
    zIndex: 2,
    color: 'black',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
