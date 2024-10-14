import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import Navbar from '../components/Navbar';
import { fetchDoc } from '../utils/getUser';
import { useState,useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { Auth } from 'firebase/auth';
import { auth } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sos from '../components/Sos';


interface UserSchema {
    name: string;
    email: string;
}

const Menu = () => {
    const navigation = useNavigation();

    const [user, setUser] = useState<UserSchema>({ name: '', email: '' });

    const fetchOnline = async()=>{
        try {
    
    
          const user1:any = await fetchDoc();
    
         
          setUser(user1);
          console.log('My User:', user);
        } catch (error) {
         
          console.log('Error fetching user:', error);
        }
      }
      
      const fetchOffline = async() => {
    
        try {
          const jsonValue = await AsyncStorage.getItem('user');
          if (jsonValue != null) {
            setUser(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.log('Error fetching user:', e);
        }
    
      }
    
      const fetch = async () => {
    
        NetInfo.fetch().then(state => {
          if (!state.isConnected) {
            console.log("No internet connection");
            fetchOffline()
          } else {
            console.log("Internet connection available");
            fetchOnline()
          }
        });
       
       
    
      };
    
    
      useEffect(() => {
        console.log("Navigation UseEffect");
        fetch();
    
       
    
      }, [navigation]);

      
  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen is focused (e.g., page is loaded by back button)
      console.log('Screen is focused');
      fetch();

      return () => {
        // Optional: cleanup when the screen is unfocused
        console.log('Screen is unfocused');
      };
    }, [])
  );


    const signout = () => {
        console.log('Sign Out');
        signOut(auth).then(() => {
          navigation.navigate('SignIn' as never);
    
        }
        ).catch((error:any) => {
          console.log(error.message);
        });
      };
    

    const handleRedirect = (screen:any) => {
        navigation.navigate(screen as never); // Pass the desired screen name
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
                            <Text style={styles.profileName} >{user.name}</Text>
                        </View>

                        {/* Menu Items */}
                        <View style={styles.menuContainer}>
                            {[
                                { title: "My Profile", screen: 'Home' },
                                { title: "Leaderboard", screen: 'leaderboard' },
                                { title: "Manage Offline Maps", screen: 'Home' },
                                { title: "Manage Notifications", screen: 'Home' },
                                { title: "SOS", screen:'SOS' },
                                { title: "Calendar", screen: 'Home' },
                                { title: "Need Help?", screen: 'Home' },
                                { title: "Settings", screen: 'settings' },
                                
                            ].map((item, index) => (
                                <View key={index} style={styles.menuItemContainer}>
                                    <TouchableOpacity onPress={() => handleRedirect(item.screen)}>
                                        <Text style={styles.menuItem}>{item.title}</Text>
                                    </TouchableOpacity>
                                    {/* Separator Image */}
                                    <Image source={require('../assets/separator.png')} style={styles.separatorImage} />
                                </View>
                            ))}
                            <TouchableOpacity onPress={() => signout()}>
                                <Text style={styles.logout} >Logout</Text>
                            </TouchableOpacity>
                            
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
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
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
        paddingBottom: 0,
        paddingVertical: 65 // Add padding to avoid overlap with the Navbar
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
        minWidth: "70%",
    },
    menuContainer: {
        width: '100%', // Increased width to 100%
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
    logout:{
        textAlign: 'left',
        paddingVertical: 10,
        fontWeight: 'bold',
        paddingLeft: 20,
        color: 'red',   
        fontSize: 18,
    }
});


export default Menu;
