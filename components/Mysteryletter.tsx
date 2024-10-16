import { View, Image, TouchableOpacity, StyleSheet, Animated, Text, Modal, Button, ImageBackground } from 'react-native';
import React, { useState, useRef } from 'react';

const MysteryLetter = () => {
  const [isLetterOpen, setIsLetterOpen] = useState(false); // State to track if the letter is open
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage the modal visibility
  const scaleValue = useRef(new Animated.Value(1)).current; // Start the scale at 1 (no scaling)

  const handlePress = () => {
    if (!isLetterOpen) {
      // Show pop-up and open the letter only when the closed letter is clicked
      setIsLetterOpen(true);
      setIsModalVisible(true);

      // Animate the scale with a "pop" effect
      Animated.spring(scaleValue, {
        toValue: 1.1, // Slightly larger size for pop effect
        friction: 5, // Control the bounciness
        useNativeDriver: true,
      }).start(() => {
        // Reset the scale back to normal after the pop
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Close the letter when the open letter is clicked
      setIsLetterOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the pop-up when the button is clicked
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [
                {
                  scale: scaleValue, // Apply the scale animation to the container
                },
              ],
            },
          ]}
        >
          <Image
            source={
              !isLetterOpen
                ? require('../assets/letterclosed.png') // Show closed letter
                : require('../assets/letteropen.png')   // Show open letter
            }
            style={styles.image} // Use same styling for both images
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Modal for the pop-up (only for closed letter click) */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <ImageBackground
            source={require('../assets/scroll.png')} // Set the scroll image as background
            style={styles.imageBackground}
            resizeMode="contain" // Ensure the image fits properly
          >
            <Text style={styles.modalText}>Shaun is a good boy!</Text>
            <Button title="Finished Reading" onPress={closeModal} />
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(0,0,0,0.0)',
    
    alignItems: 'center',
    justifyContent: 'center',
    
    top: -15,
    left:0,
  },
  image: {
    height: 202, // Fixed height for both images
    width: 282,  // Fixed width for both images
    borderRadius: 30,
    top:10,
    left:-10,
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Fixed width to prevent white box during transition
    height: 182, // Fixed height to prevent white box during transition
    left:4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  imageBackground: {
    width: 300,
    height: 400, // Adjust the size according to your scroll image
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000', // Text color for contrast with the scroll background
  },
});

export default MysteryLetter;
