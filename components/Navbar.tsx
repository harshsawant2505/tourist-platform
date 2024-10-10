import { View, Image, SafeAreaView, Pressable, Animated,Text } from 'react-native';
import React, { useState } from 'react';


type ButtonNames = 'maps' | 'camera' | 'home' | 'search' | 'more';

const Navbar = () => {
  const [pressedButton, setPressedButton] = useState<ButtonNames | null>(null); 
  
  
  const [scaleValues, setScaleValues] = useState<Record<ButtonNames, Animated.Value>>({
    maps: new Animated.Value(1),
    camera: new Animated.Value(1),
    home: new Animated.Value(1),
    search: new Animated.Value(1),
    more: new Animated.Value(1),
  });

  const handlePressIn = (button: ButtonNames) => {
    setPressedButton(button);
    
    Animated.spring(scaleValues[button], {
      toValue: 1.3, 
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (button: ButtonNames) => {
    
    
    
    Animated.spring(scaleValues[button], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView className='justify-center items-center h-full'>
      <Image source={require('../assets/mountainBack.jpg')} style={{ flex: 1 }} />

     
      <View
        style={{
          flex: 0.25,
          position: 'absolute',
          top: 75,
          left: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
          width: '90%',
          height: 75,
          borderRadius: 30,
          zIndex: 1,
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
            opacity: 1, // Keep image fully opaque
          }}
        />

        <Image
          source={require('../assets/b200.png')}
          style={{
            position: 'absolute',
            top: -15,
            left: 0,
            width: 120,
            height: 100,
            zIndex: 10, // Ensure this image is on top
          }}
        />
      </View>

      
      <View
        className='border-[2px]'
        style={{
          flex: 0.25,
          height: 80,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: 400,
          bottom: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        
        <Pressable
          className={`h-[58px] w-[65px] items-center justify-center rounded-full top-3 ${pressedButton === 'maps' ? 'border-[#3fa369] border-[2px]' : ''}`}
          onPressIn={() => handlePressIn('maps')}
          onPressOut={() => handlePressOut('maps')}
          style={{
            backgroundColor: pressedButton === 'maps' ? '#54D58A' : 'transparent', // Change color on press
          }}
        ><Text className='text-white top-[2.5] '>Maps</Text>
          <Animated.View style={{ transform: [{ scale: scaleValues.maps }] }}>
            <Image source={require('../assets/maps.png')} />
          </Animated.View>
        </Pressable>

        
        <Pressable
          className={`h-[58px] w-[65px] items-center justify-center rounded-full  top-3  ${pressedButton === 'camera' ? 'border-[#3fa369] border-[2px]' : ''}`}
          onPressIn={() => handlePressIn('camera')}
          onPressOut={() => handlePressOut('camera')}
          style={{
            backgroundColor: pressedButton === 'camera' ? '#54D58A' : 'transparent', // Change color on press
          }}
        ><Text className='text-white top-[2.5] '>Camera</Text>
          <Animated.View style={{ transform: [{ scale: scaleValues.camera }] }}>
            <Image source={require('../assets/Camera.png')} />
          </Animated.View>
        </Pressable>

        
        <Pressable
          className={`h-[58px] w-[65px] items-center justify-center rounded-full top-3 ${pressedButton === 'home' ? 'border-[#3fa369] border-[2px]' : ''}`}
          onPressIn={() => handlePressIn('home')}
          onPressOut={() => handlePressOut('home')}
          style={{
            backgroundColor: pressedButton === 'home' ? '#54D58A' : 'transparent', // Change color on press
          }}
        ><Text className='text-white top-[2.5] '>Home</Text>
          <Animated.View style={{ transform: [{ scale: scaleValues.home }] }}>
            <Image source={require('../assets/Home.png')} />
          </Animated.View>
        </Pressable>

        {/* Search Button */}
        
        <Pressable
          className={`h-[58px] w-[65px] items-center justify-center rounded-full top-3 ${pressedButton === 'search' ? 'border-[#54D58A] border-[2px]' : ''}`}
          onPressIn={() => handlePressIn('search')}
          onPressOut={() => handlePressOut('search')}
          style={{
            backgroundColor: pressedButton === 'search' ? '#54D58A' : 'transparent', // Change color on press
          }}
        ><Text className='text-white top-[2.5] '>Search</Text>
          <Animated.View style={{ transform: [{ scale: scaleValues.search }] }}>
            <Image source={require('../assets/Search.png')} />
          </Animated.View>
        </Pressable>

       
        <Pressable
          className={`h-[58px] w-[65px] items-center justify-center rounded-full top-[10] ${pressedButton === 'more' ? ' border-[#3fa369] border-[2px]' : ''}`}
          onPressIn={() => handlePressIn('more')}
          onPressOut={() => handlePressOut('more')}
          style={{
            backgroundColor: pressedButton === 'more' ? '#54D58A' : 'transparent', // Change color on press
          }}
        ><Text className='text-white top-[2.5] '>More</Text>
          <Animated.View style={{ transform: [{ scale: scaleValues.more }] }}>
            <Image source={require('../assets/More.png')} />
          </Animated.View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
