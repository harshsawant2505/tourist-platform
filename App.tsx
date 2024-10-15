import * as React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import Menu from './screens/Menu';
import QuizScreen from './screens/QuizScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import SOSScreen from './screens/SosScreen';
import SocialScreen from './screens/SocialScreen';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Define your stack navigator
const Stack = createNativeStackNavigator();

function App() {
  // Track user authentication status
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Effect to handle authentication changes
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
          source={require('./assets/splash.png')}
          style={{ width: 340, height: 340, opacity: 1 }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        // Stack Navigator when user is logged in
        <Stack.Navigator
          initialRouteName="Social" // You can update this route name later
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Social" component={SocialScreen} />
          <Stack.Screen name="SOS" component={SOSScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
