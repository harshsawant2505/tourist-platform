import { View, Text, ImageBackground, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/Navbar';
import firestore, { updateDoc } from '@react-native-firebase/firestore';
import 'firebase/compat/app'
import { collection, addDoc, doc, getDoc, query, where, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { fetchDoc } from '../utils/getUser';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import NetInfo from "@react-native-community/netinfo";
import { fetchAttractions } from '../utils/fetchSpots';

const HomeScreen = ({ navigation }: any) => {
  const [currentState, setCurrentState] = useState<string | null>(null);

  const [user, setUser] = useState<any>(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOnline = async () => {
    try {

      // updateFireStore()

      const user1 = await fetchDoc();


      setUser(user1);


    } catch (error) {

      console.log('Error fetching user:', error);
    }
  }

  const fetchOffline = async () => {

    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Error fetching user:', e);
    }

  }

  const fetchData = async () => {

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        console.log("No internet connection");
        fetchOffline()
      } else {
        console.log("Internet connection available");
        updateFireStore()
        fetchOnline()


      }
    });




  };

  const getCurrentStateOnline = async (latitude: number, longitude: number) => {
    try {
      // Replace with your reverse geocoding API
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      data.state || "Unknown";
      console.log("State: ", data.address.state)

      await AsyncStorage.setItem('state', data.address.state);
    } catch (error) {
      console.error('Error fetching state from geocoding API:', error);

    }
  };

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});

      NetInfo.fetch().then(state => {
        if (!state.isConnected) {

        } else {
          getCurrentStateOnline(location.coords.latitude, location.coords.longitude)


        }
      });




      setLocation(location);
      const storedState = await AsyncStorage.getItem('state');
      if (storedState) {
        setCurrentState(storedState);
      }
    })();




  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const [closestAttractions, setClosestAttractions] = useState<any>(null);

  const GetClosestAttractions = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('closestAttractions');
      if (jsonValue != null) {
        setClosestAttractions(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error fetching closest attractions from storage:', error);
    }
  
  }



  console.log(text)
  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen is focused (e.g., page is loaded by back button)
      console.log('Screen is focused');
      fetchData();
      if(location?.coords?.latitude && location?.coords?.longitude){
          console.log("Fetching attractions")
        fetchAttractions(location.coords.latitude, location.coords.longitude)

      }

      GetClosestAttractions()

    

      


      return () => {
        // Optional: cleanup when the screen is unfocused
        console.log('Screen is unfocused');
      };
    }, [])
  );


  const updateFireStore = async () => {


    try {

      const jsonValue = await AsyncStorage.getItem('user');
      let data = jsonValue != null ? JSON.parse(jsonValue) : {};
      const usersCollection = collection(db, "users"); // Reference to the users collection
      const q = query(usersCollection, where("email", "==", data.email)); // Create a query to find the user by email

      const querySnapshot = await getDocs(q); // Execute the query

      if (querySnapshot.empty) {
        console.log('No user found with this email:', data.email);
        return;
      }

      // Assuming emails are unique, get the first document
      const userDoc = querySnapshot.docs[0];
      const userRef: any = doc(db, "users", userDoc.id); // Get a reference to the user's document


      console.log("in here")

      await setDoc(userRef, data);

      console.log("Updated FireStore")


    } catch (error) {
      console.log(error)
    }





  }
  


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
                Manali, {currentState ? currentState : 'Loading...'}
              </Text>
              <Text className='text-md text-gray-600 py-3 font-medium'>
                A picturesque hill station nestled in the Himalayas, known for its snow-capped. known for its snow capped.
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