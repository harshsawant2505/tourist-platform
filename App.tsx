import * as React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import Menu from './screens/Menu';
<<<<<<< HEAD
import QuizScreen from './screens/QuizScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import SOSScreen from './screens/SosScreen';
import SocialScreen from './screens/SocialScreen';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import MysteryLetterScreen from './screens/MysteryLetterScreen';
import MysteryMap from './screens/MysteryMap';
=======
import SpinTheWheel from './screens/SpinTheWheel';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import QuizScreen from './screens/QuizScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
>>>>>>> d6e8de350319b81bc3a46e9620c9801746dbd146

// Define your stack navigator
const Stack = createNativeStackNavigator();

function App() {
<<<<<<< HEAD
  // Track user authentication status
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Effect to handle authentication changes
=======
  const [user, setUser] = React.useState(null);
 const [initializing, setInitializing] = useState(true);
>>>>>>> d6e8de350319b81bc3a46e9620c9801746dbd146
  useEffect(() => {
    console.log('App.js mounted');

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      console.log('User:', user);
      setUser(user);

      if (initializing) {
        console.log('Initializing with user:', user?.email);
        setInitializing(false);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [initializing]);

  // Show loading screen while initializing
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
<<<<<<< HEAD
          source={require('./assets/splash.png')}
          style={{ width: 340, height: 340, opacity: 1 }}
        />
=======
            source={require('./assets/splash.png')}
            style={{ width:340, height:340, opacity: 1 }}
            />
>>>>>>> d6e8de350319b81bc3a46e9620c9801746dbd146
      </View>
    );
  }

  return (
      <GestureHandlerRootView>
    <NavigationContainer>
      {user ? (
        // Stack Navigator when user is logged in
        <Stack.Navigator
          initialRouteName="mystery map" // You can update this route name later
          screenOptions={{
            headerShown: false,
          }}
        > 
          <Stack.Screen name="mysterymap" component={MysteryMap} />
          <Stack.Screen name="mysteryletter" component={MysteryLetterScreen} />
          <Stack.Screen name="Social" component={SocialScreen} />
          <Stack.Screen name="SOS" component={SOSScreen} />
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="leaderboard" component={LeaderboardScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Menu" component={Menu} />
        </Stack.Navigator>
      ) : (
        // Stack Navigator when no user is logged in
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
<<<<<<< HEAD
=======
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="SpinTheWheel" component={SpinTheWheel} />
          
          </Stack.Navigator>

        ): <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
        headerShown: false
        }}>
  

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        
>>>>>>> d6e8de350319b81bc3a46e9620c9801746dbd146
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
