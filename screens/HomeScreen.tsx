import { View, Image, SafeAreaView } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView className='justify-center items-center h-full'>
      <Image source={require('../assets/mountainBack.jpg')} style={{ flex: 1 }} />
      
      {/* Container View with transparent background */}
      <View 
        style={{
          flex: 0.25,
          position: 'absolute',
          top: 75,
          left: 20,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for transparency
          width: '90%',
          height: 75,
          borderRadius: 30,
          zIndex: 1
        }}
      >
        <Image
          source={require('../assets/Frame2.png')}
          style={{
            position: 'absolute',
            top: 13,
            left: 50,
            width: 250,
            height: 50,
            opacity: 1 // Keep image fully opaque
          }}
        />
        
        <Image
          source={require("../assets/b200.png")}
          style={{
            position: 'absolute',
            top: -10,
            left: 0,
            width: 120,
            height: 100,
            zIndex: 10 // Ensure this image is on top
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
