import { View, Pressable, Animated, Image, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <View
        style={{
          height: 80,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: 420,
          bottom:-70,
          right:-8,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <Pressable
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28, // Circular shape
            paddingTop: 6, 
            marginTop:12,// Adjust image slightly down from the top
            backgroundColor: pressedButton === 'maps' ? '#54D58A' : 'transparent',
          }}
          onPressIn={() => handlePressIn('maps')}
          onPressOut={() => handlePressOut('maps')}
        >
          <Animated.View style={{ transform: [{ scale: scaleValues.maps }] }}>
            <Image source={require('../assets/maps.png')} />
          </Animated.View>
        </Pressable>

        <Pressable
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28,
            paddingTop: 6, 
            marginTop:12,// Adjust image slightly down from the top
            backgroundColor: pressedButton === 'camera' ? '#54D58A' : 'transparent',
          }}
          onPressIn={() => handlePressIn('camera')}
          onPressOut={() => handlePressOut('camera')}
        >
          <Animated.View style={{ transform: [{ scale: scaleValues.camera }] }}>
            <Image source={require('../assets/Camera.png')} />
          </Animated.View>
        </Pressable>

        <Pressable
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28,
            paddingTop: 6,
            marginTop:12, // Adjust image slightly down from the top
            backgroundColor: pressedButton === 'home' ? '#54D58A' : 'transparent',
          }}
          onPressIn={() => handlePressIn('home')}
          onPressOut={() => handlePressOut('home')}
        >
          <Animated.View style={{ transform: [{ scale: scaleValues.home }] }}>
            <Image source={require('../assets/Home.png')} />
          </Animated.View>
        </Pressable>

        <Pressable
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28,
            paddingTop: 6, 
            marginTop:12,// Adjust image slightly down from the top
            backgroundColor: pressedButton === 'search' ? '#54D58A' : 'transparent',
          }}
          onPressIn={() => handlePressIn('search')}
          onPressOut={() => handlePressOut('search')}
        >
          <Animated.View style={{ transform: [{ scale: scaleValues.search }] }}>
            <Image source={require('../assets/Search.png')} />
          </Animated.View>
        </Pressable>

        <Pressable
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28,
            paddingTop: 6, 
            marginTop:12,// Adjust image slightly down from the top
            backgroundColor: pressedButton === 'more' ? '#54D58A' : 'transparent',
          }}
          onPressIn={() => handlePressIn('more')}
          onPressOut={() => handlePressOut('more')}
        >
          <Animated.View style={{ transform: [{ scale: scaleValues.more }] }}>
            <Image source={require('../assets/More.png')} />
          </Animated.View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
