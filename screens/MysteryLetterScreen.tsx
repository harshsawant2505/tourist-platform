import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import Mysteryletter from '../components/Mysteryletter';

const MysteryMap = () => {
  return (
    <SafeAreaView className="w-full h-full" style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/mountainBack.jpg')}
        style={{ flex: 1 }}
      >
         <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
        {/* Background White Box */}
        <View
          style={{
          
          }}
        />

        {/* ScrollView for MysteryLetters with gap and padding */}
        
          <View style={{ paddingBottom: 80 }}>
            <Mysteryletter />
          </View>
          <View style={{ paddingBottom: 80 }}>
            <Mysteryletter />
          </View>
          <View style={{ paddingBottom: 80 }}>
            <Mysteryletter />
          </View>
          {/* Add more Mysteryletter components as needed */}
       

        {/* Title of the Section */}
        <View style={styles.titleContainer}>
          <Text className="text-white text-[35px] font-[600]">Mystery Letters</Text>
        </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Navbar />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
    paddingTop: 150, // Adjusted to make space for the title and prevent overlap
    paddingHorizontal: 20, // Add some horizontal padding for layout
    paddingBottom: 80, // To add space below the last Mysteryletter
  },
  titleContainer: {
    position: 'absolute',
    top: 70, // Position the title just above the ScrollView
    left: 44,
    zIndex: 2,
  },
});

export default MysteryMap;