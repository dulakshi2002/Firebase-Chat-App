import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


export default function loading({size}) {
  return (
    <View>
       <LottieView style={{flex: 1}} source={require('../assets/images/loading.json')} autoPlay loop />
    </View>
  )
}