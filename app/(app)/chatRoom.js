import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function chatRoom() {

    const item = useLocalSearchParams();
    console.log('got item data: ', item);

  return (
    <View>
      <Text>chatRoom</Text>
    </View>
  )
}