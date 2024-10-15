// In App.js in a new project

import * as React from 'react';
import { View, Text, Image, Settings } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import { useEffect, useState } from 'react';
import Menu from './screens/Menu';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import QuizScreen from './screens/QuizScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import SOSScreen from './screens/SosScreen';
import PostScreen from './screens/PostScreen';


const Stack = createNativeStackNavigator();



function App() {
 const [user, setUser] = React.useState(null);
 const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    console.log('App.js mounted');

    let unsubscribe =  onAuthStateChanged(auth,(user:any) => {
      console.log('User:', user);
    
        setUser(user);
        if (initializing) {
          console.log('User:', user?.email);
          setInitializing(false);
        }
        console.log('User:', user?.email);
      
      
    }
  
    );
    return unsubscribe;
}, []);

  React.useEffect(() => {
    console.log('App.js mounted');
  }
  , []);

  if (initializing) {
    return (
      <View style = {{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Image
            source={require('./assets/splash.png')}
            style={{ width:340, height:340, opacity: 1 }}
        />
      </View>
    ) // or a loading component
  }

  return (
    <NavigationContainer>
      {
        user?(
          <Stack.Navigator
          initialRouteName="Menu"//later change intial route name

          screenOptions={{
          headerShown: false
          }}>
             
          <Stack.Screen name="SOS" component={SOSScreen} />  
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="leaderboard" component={LeaderboardScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="quiz" component={QuizScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Menu" component={Menu} />
          
          </Stack.Navigator>

        ): <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
        headerShown: false
        }}>
  

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        
        </Stack.Navigator>
      }
    
    </NavigationContainer>
  );
}

export default App;