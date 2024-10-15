import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/Navbar';
import firestore from '@react-native-firebase/firestore';
import { fetchDoc } from '../utils/getUser';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import NetInfo from "@react-native-community/netinfo";
import { fetchAttractions } from '../utils/fetchSpots';

const HomeScreen = ({ navigation }: any) => {
  const [currentState, setCurrentState] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [closestAttractions, setClosestAttractions] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [stateDescription, setStateDescription] = useState<string | null>(null);

  // Step 1: Fetch data from AsyncStorage first
  const fetchOfflineData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        setUser(JSON.parse(jsonValue)); // Set user data from AsyncStorage
      }
      const storedState = await AsyncStorage.getItem('state');
      if (storedState) {
        setCurrentState(storedState); // Set state (e.g., location) from AsyncStorage
        const storedDescription = await AsyncStorage.getItem('StateDescription');
        if (storedDescription) {
          setStateDescription(storedDescription); // Set state description from AsyncStorage
        }
      }


      const closestAttractionsValue = await AsyncStorage.getItem('closestAttractions');
      if (closestAttractionsValue) {
        setClosestAttractions(JSON.parse(closestAttractionsValue)); // Load attractions from AsyncStorage
      }
    } catch (error) {
      console.log('Error fetching offline data:', error);
    }
  };

const fetchWikipediaData = async (state: string) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${state}&exintro&explaintext&origin=*`
    );
    const data = await response.json();
    const page:any = Object.values(data.query.pages)[0];
    const description = page.extract;
    return description;
  } catch (error) {
    console.log('Error fetching Wikipedia data:', error);
    return null;
  }
};

  // Step 2: Fetch updated data online if internet is available
  const fetchOnlineData = async () => {
    try {
      const userData = await fetchDoc(); // Fetch user data from Firestore
      if (userData) {
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData)); // Update AsyncStorage with new user data
      }

      const locationData = await getLATLONG(); // Fetch location data (e.g., state)
      if (locationData?.state) {
        setCurrentState(locationData.state);
        await AsyncStorage.setItem('state', locationData.state); // Update AsyncStorage with new state

         // Fetch Wikipedia data
      const wikiData = await fetchWikipediaData(locationData.state);
      if (wikiData) {
        setStateDescription(wikiData); // Assuming you have a state to store Wikipedia data
        await AsyncStorage.setItem('StateDescription', wikiData); // Store Wikipedia data in AsyncStorage
      }
    }

     

      // Fetch and update closest attractions
      const attractionsData = await fetchAttractions(location?.coords.latitude, location?.coords.longitude);
      setClosestAttractions(attractionsData);
      await AsyncStorage.setItem('closestAttractions', JSON.stringify(attractionsData));
      
    } catch (error) {
      console.error('Error fetching online data:', error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };

  // Step 3: Check internet connection and update if online
  const fetchData = async () => {
    await fetchOfflineData(); // Load offline data first

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        console.log("Internet connection available, fetching online data");
        fetchOnlineData(); // Fetch online data if internet is available
      } else {
        console.log("No internet connection, using offline data");
        setLoading(false); // If offline, stop loading after fetching offline data
      }
    });
  };

  const getLATLONG = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let locationData: any = await Location.getCurrentPositionAsync({});
    setLocation(locationData);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&format=json`
      );
      const data = await response.json();
      const state = data.address.state || 'Unknown';

      console.log("State: ", state);
      await AsyncStorage.setItem('state', state);

      return { state };
    } catch (error) {
      console.error('Error fetching state from geocoding API:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Call fetch logic when screen is focused
    }, [])
  );

  // if (loading) {
  //   return <Text>Loading...</Text>; // Display a loading state
  // }

  return (

    <SafeAreaView className='w-full h-full'>
      <ImageBackground
        source={require('../assets/mountainBack.jpg')}
        style={{ flex: 1 }}>

        <ScrollView>



          <View className='w-full h-10 flex-row flex space-x-5 justify-center items-center bg-gray-800'>
            <Text className='text-white '>Email: {user?.email}</Text>

            <Text className='text-white '>Points: {user?.points}</Text>

          </View>


          <View className='w-full h-full px-2 justify-center gap-2'>




            <View className='w-full flex-row h-[145px] justify-between  '>
              <View className='w-[32%] h-full gap-y-1  '>

                <View className='h-[49%] px-2 py-1  rounded-md ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.58)' }}>
                  <View className='py-1  '>
                    <Text className='text-white font-bold text-xl'>77F</Text>
                    <Text className='font-medium  w-24 text-sm text-white p-0'>Thunderstorm</Text>
                  </View>
                </View>

                <View className='h-[48%] px-2 py-1  rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.58)' }}>
                  <View className='py-1'>
                    <Text className='text-white font-bold text-xl'>Events</Text>
                    <Text className='font-medium text-white w-24'>no ongoing</Text>
                  </View>
                </View>




              </View>

              <View className='w-[65%] rounded-md p-2 h-full ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.58)' }}>
                <Text className='text-lg font-bold text-white'>No Bookings Made Yet</Text>


                <View className='w-full  flex-row flex-wrap  gap-x-3 gap-y-2 h-24 py-2 '>

                  <View className='rounded-md px-2 py-1 text-white  bg-gray-500' >
                    <Text className='text-white font-semibold' >Hotels +</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold ' >Restaurants +</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold ' >Bike +</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold ' >Car +</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold ' >Guide +</Text>
                  </View>

                </View>

              </View>

            </View>




            {/* location */}
            <View className='w-full h-[147px] py-5 px-5 rounded-md ' style={{ backgroundColor: 'rgba(255, 255, 255, 0.80)' }}>
              <Text className='text-2xl  text-black  font-medium'>
                {currentState ? currentState : 'Loading...'}
              </Text>
              <Text className='text-md text-gray-600 py-1 font-medium'>
                {stateDescription ? stateDescription.split(' ').slice(0, 26).join(' ') + '...' : 'Loading...'}
               
              </Text>
            </View>


            {/* Mystery map */}

            <View className='w-full flex-row px-2 justify-between items-center h-[225px] bg-black rounded-lg' style={{ backgroundColor: 'rgba(0, 0, 0, 0.58)' }}>

              <Image
                source={require('../assets/MysteryMap.png')}
                className=" w-40 h-40 opacity-100 "
              />

              <View className='h-full w-44  relative py-4'>
                <Text className='text-2xl text-white font-semibold  '>Mystery Maps</Text>
                <View className='w-44  flex-row flex-wrap  gap-x-3 gap-y-2 h-32 py-8 '>


                  <View className='rounded-md px-2 py-1 p-1 text-white  bg-gray-500' >
                    <Text className='text-white font-semibold' >Hike Site</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold opacity-100'>View Point</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold opacity-100 px-1'>1.5 Hr</Text>
                  </View>
                  <View className='rounded-md px-2 py-1 text-white bg-gray-500' >
                    <Text className='text-white font-semibold opacity-100 px-1'>6Km</Text>
                  </View>




                </View>

                <TouchableOpacity
                  className="px-2 w-16 bottom-3 right-6 absolute py-2 mt-5 rounded bg-white items-center"

                >
                  <Text className="text-black text-md">Start</Text>
                </TouchableOpacity>
              </View>



            </View>


            <View className='w-full h-40 mb-10  flex-row '>
              <ScrollView horizontal className='gap-1 '>
                <View className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                  <Image
                    source={require('../assets/envelope.png')}
                    className=" w-20 h-20 opacity-100 "
                  />
                  <Text className='text-white mt-2 text-sm font-medium'>Mystery Map</Text>
                </View>
                <TouchableOpacity  className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }} onPress={()=>navigation.navigate('SpinTheWheel', { stateName: currentState, closestAttractions: closestAttractions })}>
                  <Image
                    source={require('../assets/wheel.png')}
                    className=" w-20 h-20 opacity-100 mt-2 "
                  />
                  <Text className='text-white text-sm font-medium'>SpinTheWheel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('quiz')} className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                  <Image
                    source={require('../assets/quiz.png')}
                    className=" w-20 h-20 opacity-100 "

                  />
                  <Text className='text-white mt-2 text-sm font-medium'>Discovered</Text>
                </TouchableOpacity>
                <View className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                  <Image
                    source={require('../assets/quiz.png')}
                    className=" w-24 h-24 opacity-100 "
                  />
                </View>


              </ScrollView>


            </View>


          </View>



        </ScrollView>

        <Navbar />

      </ImageBackground>
    </SafeAreaView>
  );
};



export default HomeScreen