import { View, Text, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboardView from '../components/CustomKeyboardView';
import Loading from '../components/loading';
import { useAuth } from '../context/authContext';


export default function signUp() {

  const router = useRouter();
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");


  const handleRegister = async ()=>{
    if(!emailRef.current || !passwordRef.current || !passwordConfirmRef.current || !usernameRef.current || !profileRef.current){
      Alert.alert('Sign Up', "Please fill all the feilds!");
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, passwordConfirmRef.current, profileRef.current);
    setLoading(false);

    //register process

    console.log('got result: ', response);
    if(!response.success){
      Alert.alert('Sign Up', response.msg);
    }
  }

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{paddingTop: hp(7), paddingHorizontal: wp(5)}} className="flex-1 dap-12">
        {/*signIn image */}
        <View className="items-center">
          <Image style={{height: hp(20)}} resizeMode='contain' source={require('../assets/images/register.jpg')} />
        </View>

        <View className="gap-10">
          <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>
          
          {/* inputs */}
          <View className="gap-4">
            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Feather name="user" size={hp(2.7)} color="gray"/>
              <TextInput 
              onChangeText={value=> usernameRef.current=value}
              style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
              placeholder='Name'
              placeholderTextColor={'gray'} />
            </View>

            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Octicons name="mail" size={hp(2.7)} color="gray"/>
              <TextInput 
              onChangeText={value=> emailRef.current=value}
              style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
              placeholder='Email Address'
              placeholderTextColor={'gray'} />
            </View>
            
            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Octicons name="lock" size={hp(2.7)} color="gray"/>
              <TextInput 
              secureTextEntry
              onChangeText={value=> passwordRef.current=value}
              style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
              placeholder='Password'
              placeholderTextColor={'gray'} />
            </View>

            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Octicons name="lock" size={hp(2.7)} color="gray"/>
              <TextInput 
              secureTextEntry
              onChangeText={value=> passwordConfirmRef.current=value}
              style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
              placeholder='Confirm Password'
              placeholderTextColor={'gray'} />
            </View>

            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Feather name="image" size={hp(2.7)} color="gray"/>
              <TextInput 
              onChangeText={value=> profileRef.current=value}
              style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
              placeholder='Profile Url'
              placeholderTextColor={'gray'} />
            </View>
            

            {/* submit button */}
            <View style={{flex: 1, height: hp(6.5), justifyContent: 'center', alignItems: 'center'}} className="bg-indigo-500 rounded-xl justify-center items-center pt-5">
              {
                loading? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(6.5)}/>
                  </View>
                ):(
                  <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} >
                    <Text style={{fontSize: hp(2.7)}} className="text-black font-bold tracking-wider">Sign Up</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          

            {/* sign up text */}
            <View className="flex-row justify- center">
              <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an account? </Text>
              
              <Pressable onPress={()=> router.push('signIn')}>
                <Text style={{fontSize: hp(1.8)}} className="font-bold text-indigo-500">Sign In</Text>
              </Pressable>
            </View>

          </View>
          
        </View>
      </View>
    </CustomKeyboardView>
  )
}