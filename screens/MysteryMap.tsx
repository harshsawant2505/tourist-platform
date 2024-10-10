import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';

const MysteryMap = () => {
  return (
    <SafeAreaView className="w-full h-full" style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/mountainBack.jpg')}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: 722,
            width: 394,
            backgroundColor: 'black',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 100,
            left: 8,
            borderRadius: 20,
            opacity: 0.58,
          }}
        />
        
        
        <View style={{ position: 'absolute', top: 100, left: 82, zIndex: 2 }}>
          <Text className='text-white text-[40px] font-[600]' style={{ opacity: 1 }}>Mystery Maps</Text>
        </View>

        {/* Add a wrapper View with absolute positioning for Navbar */}
        <View style={{ position: 'absolute', bottom: 70, left: 0, right: 0, zIndex: 1 }}>
          <Navbar />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MysteryMap;
