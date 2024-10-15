import { View, Text, ImageBackground, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/core';

interface LeaderboardUser {
    rank: number;
    name: string;
    points: number;
    profileImage: any;
  }

const LeaderboardScreen = () => {
    const navigation = useNavigation();
  // Sample data for top 10 users
  const topTenUsers = [
    { rank: 1, name: 'shaun', points: 130, profileImage: require('../assets/samprofile.png') },
    { rank: 2, name: 'kedron', points: 115, profileImage: require('../assets/samprofile.png') },
    { rank: 3, name: 'parshuram', points: 110, profileImage: require('../assets/samprofile.png') },
    { rank: 4, name: 'sawant', points: 105, profileImage: require('../assets/samprofile.png') },
    { rank: 5, name: 'chinmay', points: 100, profileImage: require('../assets/samprofile.png') },
    { rank: 6, name: 'mrunal', points: 95, profileImage: require('../assets/samprofile.png') },
    { rank: 7, name: 'roh', points: 90, profileImage: require('../assets/samprofile.png') },
    { rank: 8, name: 'rko', points: 85, profileImage: require('../assets/samprofile.png') },
    { rank: 9, name: 'bhau', points: 80, profileImage: require('../assets/samprofile.png') },
    { rank: 10, name: 'king', points: 75, profileImage: require('../assets/samprofile.png') },
  ];

  // Function to render each leaderboard item
  const renderLeaderboardItem = ({ item }:{ item: LeaderboardUser }) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#f8f8f8', // Off-white background
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 20,
      borderRadius: 10,
    }}>
      {/* Display rank before the profile picture */}
      <Text style={{
        color: 'black', // Black text
        fontSize: 18,
        fontWeight: 'bold',
      }}>{item.rank}</Text>
      <Image source={item.profileImage} style={{
        width: 50,
        height: 50,
        borderRadius: 25,
      }} />
      <Text style={{
        flexBasis: 150,
        color: 'black', // Black text
        fontSize: 18,
        fontWeight: 'bold',
      }}>{item.name}</Text>
      <Text style={{
        color: 'black', // Black text
        fontSize: 18,
        fontWeight: 'bold',
      }}>{item.points} pts</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/mountainBack.jpg')}
        style={{ flex: 1 ,height:800,width:400}}
        
      >
        {/* Background View for opacity, separated from content */}
        <View style={{
          height: 722,
          width: 379,
          padding:50,
          backgroundColor: 'black',
          position: 'absolute',
          top: 25,
          left: 7,
          borderRadius: 20,
          opacity: 0.58,
        }} />

        {/* Main content container */}
        <View style={{ position: 'absolute', top: 30, left: 11, width: 389, height: 722 }}>
          {/* Header with back button and leaderboard title */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 10,
            width: '100%',
          }}>
            <Pressable
              onPress={()=>navigation.navigate('Menu')}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Image
                source={require('../assets/back1.png')}
                style={{
                  width: 80,
                  height: 80,
                  left: -30,
                  top: 15,
                }}
              />
            </Pressable>

            <Text style={{
              color: 'white',
              left: -30,
              top: 10,
              fontSize: 40,
              fontWeight: '600',
            }}>
              Leaderboard
            </Text>
          </View>

          {/* Container for top 3 users */}
          <View style={{
            height: 200,
            width: 350,
            backgroundColor: 'transparent',
            left: 18,
            top: 25,
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 10,
          }}>
            {/* Second User */}
            <View style={{
              height: 150,
              width: 100,
              backgroundColor: 'transparent',
              
            }}>
              <Image
                source={require('../assets/samprofile.png')}
                style={{
                  height: 90,
                  width: 90,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  borderColor: 'green',
                  borderWidth: 4,
                  top: (120 - 90) / 2,
                  left: (70 - 90) / 2,
                }}
              />
              <Image
                source={require('../assets/second.png')}
                style={{
                  height: 30,
                  width: 30,
                  top: -5,
                  left: 20,
                }}
              />
              <View style={{
                height: 30,
                width: 100,
                top: -10,
                left: -15,
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>{topTenUsers[1].name}</Text>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>{topTenUsers[1].points} pts</Text>
              </View>
            </View>

            {/* First User */}
            <View style={{
              height: 150,
              width: 100,
              backgroundColor: 'transparent',
            }}>
              <Image
                source={require('../assets/samprofile.png')}
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  borderColor: 'green',
                  borderWidth: 4,
                  top: (50 - 100) / 2,
                  left: (95 - 100) / 2,
                }}
              />
              <Image
                source={require('../assets/crown.png')}
                style={{
                  height: 30,
                  width: 30,
                  top: -145,
                  left: 35,
                }}
              />
              <Image
                source={require('../assets/first.png')}
                style={{
                  height: 30,
                  width: 30,
                  top: -75,
                  left: 35,
                }}
              />
              <View style={{
                height: 30,
                width: 100,
                top: -80,
                left: 1,
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                
                  textAlign: 'center',
                  fontWeight: '500',
                }}>{topTenUsers[0].name}</Text>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>{topTenUsers[0].points} pts</Text>
              </View>
            </View>

            {/* Third User */}
            <View style={{
              height: 150,
              width: 100,
              backgroundColor: 'transparent',
            }}>
              <Image
                source={require('../assets/samprofile.png')}
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  borderColor: 'green',
                  borderWidth: 4,
                  top: (130 - 80) / 2,
                  left: (100 - 80) / 2,
                }}
              />
              <Image
                source={require('../assets/third.png')}
                style={{
                  height: 30,
                  width: 30,
                  top: 5,
                  left: 35,
                }}
              />
              <View style={{
                height: 30,
                width: 100,
                top: 0,
                left: 1,
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>{topTenUsers[2].name}</Text>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>{topTenUsers[2].points} pts</Text>
              </View>
            </View>
          </View>

          {/* FlatList for top 10 users */}
          <FlatList
            data={topTenUsers} 
            renderItem={renderLeaderboardItem}
            keyExtractor={item => item.rank.toString()}
            style={{
              marginTop: 15,
              left:-9,
            }}
          />
        </View>
      </ImageBackground>
      <Navbar />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
