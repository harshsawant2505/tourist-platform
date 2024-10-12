import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Navbar from '../components/Navbar';

const Menu = () => {
    const navigation = useNavigation();

    const handleRedirect = (screen) => {
        navigation.navigate(screen); // Pass the desired screen name
    };

    return (
        <View style={styles.wrapper}>
            <ImageBackground
                source={require('../assets/mountainBack.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.centeredContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {/* Profile Header */}
                        <View style={styles.headerContainer}>
                            <Image source={require('../assets/wheel.png')} style={styles.icon} />
                            <Text style={styles.profileName}>Harshita Grover</Text>
                        </View>

                        {/* Menu Items */}
                        <View style={styles.menuContainer}>
                            {[
                                { title: "My Profile", screen: 'Home' },
                                { title: "Leaderboard", screen: '' },
                                { title: "Manage Offline Maps", screen: 'Home' },
                                { title: "Manage Notifications", screen: 'Home' },
                                { title: "SOS", screen: 'Home' },
                                { title: "Calendar", screen: 'Home' },
                                { title: "Need Help?", screen: 'Home' },
                                { title: "Settings", screen: 'Home' },
                                { title: "More", screen: 'Home' },
                            ].map((item, index) => (
                                <View key={index} style={styles.menuItemContainer}>
                                    <TouchableOpacity onPress={() => handleRedirect(item.screen)}>
                                        <Text style={styles.menuItem}>{item.title}</Text>
                                    </TouchableOpacity>
                                    {/* Separator Image */}
                                    <Image source={require('../assets/separator.png')} style={styles.separatorImage} />
                                </View>
                            ))}
                        </View>

                    </ScrollView>
                </View>
                <Navbar />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F0F0F0', // Background color of the entire screen
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center', // Center content vertically
    },
    centeredContainer: {
        flex: 8,
        width: '100%',
        justifyContent: 'center', // Center the menu vertically
        alignItems: 'center',
        paddingBottom: 20,
        paddingVertical: 100 // Add padding to avoid overlap with the Navbar
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: '100%',
        height: 80,
        paddingBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
        paddingVertical: 15,
        borderRadius: 30,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    menuContainer: {
        width: '100%', // Increased width to 90%
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
        marginTop: 10, // Overlapping the header slightly
        borderRadius: 20,
    },
    menuItemContainer: {
        width: '80%',
        alignItems: 'flex-start', // Change to 'flex-start' for left alignment
    },
    menuItem: {
        fontSize: 18,
        color: '#000',
        textAlign: 'left', // Ensures text is aligned to the left
        paddingVertical: 10,
        fontWeight: 'bold',
        paddingLeft: 20, // Optional: Add left padding for better spacing
    },
    separatorImage: {
        width: '100%', // Adjust as needed for your separator image
        height: 1.5, // Adjust height according to the image
        marginVertical: 5,
    },
});

export default Menu;
