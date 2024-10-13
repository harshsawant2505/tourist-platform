// In App.js in a new project

import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import { useEffect, useState } from 'react';
import Menu from './screens/Menu';
import SpinTheWheel from './screens/SpinTheWheel';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import QuizScreen from './screens/QuizScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <GestureHandlerRootView>
    <NavigationContainer>
      {
        user?(
          <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
          headerShown: false
          }}>
    

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="quiz" component={QuizScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
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
        
        </Stack.Navigator>
      }
    
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;