import { View, Text, ImageBackground, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur';
import Badge from '../components/Badge';

//this is the hom frome harsh

const HomeScreen = () => {

  return (
    
    <SafeAreaView className='w-full h-full'>
    <ImageBackground
    source={require('../assets/mountainBack.jpg')}
    style={{ flex: 1 }}>
   
        <View className='w-full h-10 flex justify-center items-center bg-gray-800'>
              <Text className='text-white '>Nav bar</Text>
        </View>


      <View className='w-full h-full px-2 justify-center gap-4'>




          <View className='w-full flex-row h-[145px] justify-between  '>
                <View className='w-[30%] gap-y-1  '>

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

                <View className='w-[65%] rounded-md p-2 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.58)' }}>
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
              <View className='w-full h-[147px] py-5 px-5 rounded-md ' style={{ backgroundColor: 'rgba(255, 255, 255, 0.80)'}}>
                  <Text className='text-2xl  text-black  font-medium'>
                  Manali, Himachal Pradesh
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


          <View className='w-full h-40 py-2 flex-row '>
              <ScrollView horizontal className='gap-3 px-1'>
                 <View className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                 <Image
                  source={require('../assets/envelope.png')}
                  className=" w-20 h-20 opacity-100 "
               />
               <Text className='text-white mt-2 text-sm font-medium'>Mystery Map</Text>
                 </View>
                 <View className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                 <Image
                  source={require('../assets/wheel.png')}
                  className=" w-20 h-20 opacity-100 mt-2 "
               />
                <Text className='text-white text-sm font-medium'>SpinTheWheel</Text>
                 </View>
                 <View className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                 <Image
                  source={require('../assets/quiz.png')}
                  className=" w-20 h-20 opacity-100 "
               />
                <Text className='text-white mt-2 text-sm font-medium'>Discovered</Text>
                 </View>
                 <View className='w-28 h-28 bg-black items-center rounded-md' style={{ backgroundColor: 'rgba(0, 0, 0, 0.43)' }}>
                 <Image
                  source={require('../assets/quiz.png')}
                  className=" w-24 h-24 opacity-100 "
               />
                 </View>
                
             
              </ScrollView>

          </View>
         

      </View>
    </ImageBackground>
    </SafeAreaView>
  );
};


 
export default HomeScreen