import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, TextInput } from 'react-native';
import * as Location from 'expo-location'; 
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import { Ionicons } from '@expo/vector-icons'; // For icons

const SOSScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [contact1, setContact1] = useState('');  

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to send your location.');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  const sendWhatsAppMessage = async (number: string) => {
    let message = `This is an SOS. Please send help!`;

    // Add location to the message if available
    if (location) {
      const { latitude, longitude } = location.coords;
      message += ` My current location is: https://maps.google.com/?q=${latitude},${longitude}`;
    } else {
      message += ` Location could not be retrieved.`;
    }

   
    const formattedNumber = number.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    
    try {
      await Linking.openURL(whatsappUrl);
      console.log(`Sent SOS message to ${number} via WhatsApp`);
    } catch (error) {
      Alert.alert('Error', `Failed to send SOS message to ${number}`);
      console.error(`Failed to send WhatsApp message to ${number}:`, error);
    }
  };

  const handleSOS = async () => {
    await getLocation(); // Get the location first
    Alert.alert(
      'Send SOS',
      'Are you sure you want to send an SOS?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: async () => {
            if (contact1) await sendWhatsAppMessage(contact1); // Send to contact 1
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="alert-circle-outline" size={100} color="white" />
        <Text style={styles.title}>Emergency SOS</Text>
        <Text style={styles.description}>
          If you enter no contact, the SOS message will not be sent. Please ensure to enter a valid emergency contact.
        </Text>
        <Text style={styles.contactText}>ENTER YOUR EMERGENCY CONTACT</Text>
        <TextInput
          style={styles.input}
          placeholder="Emergency Contact (with country code)"
          value={contact1}
          onChangeText={setContact1}
          keyboardType="phone-pad"
        />
     
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosText}>Send SOS</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 30,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly translucent background
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor: 'white',
    color: 'black', // Text visibility in input
    fontSize: 16,
  },
  sosButton: {
    backgroundColor: '#ff4c4c',
    padding: 15,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  sosText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SOSScreen;
