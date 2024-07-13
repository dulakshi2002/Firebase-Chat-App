import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import HomeHeader from '../../components/HomeHeader'
import SplashScreenComponent from '../SplashScreen'; // Adjust the import based on your folder structure


export default function _layout() {
  
  const [appLoaded, setAppLoaded] = useState(false);

  const handleAppLoaded = () => {
    setAppLoaded(true);
  };

  if (!appLoaded) {
    return <SplashScreenComponent onLoaded={handleAppLoaded} />;
  }
  
  return (
    <Stack>
      <Stack.Screen
      name="home"
      options={{
        header: ()=> <HomeHeader/> 
      }} />
    </Stack>
  )
}