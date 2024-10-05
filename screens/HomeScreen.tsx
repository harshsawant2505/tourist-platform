import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex justify-center items-center h-full '>
      <Text className='text-3xl text-red-600'>This is the HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen