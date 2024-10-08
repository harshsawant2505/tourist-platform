import {
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView
  } from 'react-native';
  import React, { useState } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import {auth} from '../firebase';
  
  const SignUpScreen = ({navigation}:any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
       console.log('Sign Up:', { name, email, password });

       if(email === '' || password === '' || name === ''){
        alert('Please fill all the fields');
        return;
       }

      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential:any) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
      }).catch((error:any) => {
        var errorCode = error.code;
        var errorMessage = error.nativeErrorMessage;
        alert(error.message);
        console.log(error.message);

      });
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/mountainBack.jpg')}
          style={{ flex: 1 }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
            >
              <View className="bg-[#040D19] h-[80%] w-full flex flex-col items-center rounded-t-3xl">
                <Image
                  source={require('../assets/manStars.png')}
                  className="w-40 h-40 mt-10"
                />
                <View className="w-full items-center px-5 py-10">
                  <Text className="text-white text-2xl mb-1 font-medium">
                    Create An Account
                  </Text>
                  <Text className="text-gray-600 text-lg font-light">
                    Please fill all the fields to continue
                  </Text>
  
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor={'#A0A0A0'}
                    value={name}
                    onChangeText={setName}
                    className="bg-[#1B203D] text-white w-full px-3 py-3 mt-5 rounded-lg"
                  />
  
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={'#A0A0A0'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    className="bg-[#1B203D] text-white w-full px-3 py-3 mt-5 rounded-lg"
                  />
  
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={'#A0A0A0'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="bg-[#1B203D] text-white w-full px-3 py-3 mt-5 rounded-lg"
                  />
  
                  <TouchableOpacity
                    className="px-12 py-2 mt-5 rounded-xl bg-orange-600 items-center"
                    onPress={signUp}
                  >
                    <Text className="text-white text-lg">Sign Up</Text>
                  </TouchableOpacity>
  
                  <Text className="text-gray-500 text-md mt-16">
                    Already have an account?
                    <Text className="text-orange-600" onPress={()=>navigation.navigate('Signin')}> Sign In</Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    );
  };
  
  export default SignUpScreen;
