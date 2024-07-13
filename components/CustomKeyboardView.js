import { View, Text, Platform,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const android = Platform.OS == "android"

export default function CustomKeyboardView({children}) {
  return (
    <KeyboardAvoidingView
    behavior={android? 'padding': 'height'} 
    style={{flex: 1}}>
        <ScrollView 
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false} >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}