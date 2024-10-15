import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const SocialScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Search Input */}
      <TextInput 
        style={styles.searchInput} 
        placeholder="Search" 
        placeholderTextColor="black" 
      />

      {/* Scrollable Card List */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* You can add multiple cards here */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    width: 372,
    backgroundColor: 'rgba(128,128,128,0.15)',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 11,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  scrollView: {
    top:-50,
    left:-10,
    marginTop: 10,  // Adds space below the search bar
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 70,  // Ensure padding so content doesn't overlap with the navbar
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SocialScreen;
