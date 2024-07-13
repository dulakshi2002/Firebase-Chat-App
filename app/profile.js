import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboardView from '../components/CustomKeyboardView';
import Loading from '../components/loading';
import { useAuth } from '../context/authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { usersRef } from '../firebaseConfig';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const emailRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  useEffect(() => {
    if (user?.uid) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(usersRef, user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        emailRef.current = userDoc.data().email;
        usernameRef.current = userDoc.data().username;
        profileRef.current = userDoc.data().profileUrl;
      } else {
        Alert.alert('Error', 'User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data');
    }
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    if (!emailRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Update Profile', 'Please fill all the fields!');
      return;
    }
    setLoading(true);
    try {
      await updateDoc(doc(usersRef, user.uid), {
        email: emailRef.current,
        username: usernameRef.current,
        profileUrl: profileRef.current,
      });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
    setLoading(false);
  };

  const handleLogOut = async () => {
    await logout();
    router.replace('signIn');
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Profile</Text>

        {loading ? (
          <View className="flex items-center" style={{ top: hp(30) }}>
            <Loading size={hp(6.5)} />
          </View>
        ) : (
          <View className="gap-4">
            <View className="items-center">
              <Image style={{ height: hp(20) }} resizeMode="contain" source={{ uri: userData?.profileUrl }} />
            </View>

            <View className="gap-4">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                <Feather name="user" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={value => (usernameRef.current = value)}
                  defaultValue={userData?.username}
                  style={{ fontSize: hp(2) }} className="flex-1 font-semibold text-neutral-700"
                  placeholder="Name"
                  placeholderTextColor="gray"
                />
              </View>

              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                <Octicons name="mail" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={value => (emailRef.current = value)}
                  defaultValue={userData?.email}
                  style={{ fontSize: hp(2) }} className="flex-1 font-semibold text-neutral-700"
                  placeholder="Email Address"
                  placeholderTextColor="gray"
                />
              </View>

              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                <Feather name="image" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={value => (profileRef.current = value)}
                  defaultValue={userData?.profileUrl}
                  style={{ fontSize: hp(2) }} className="flex-1 font-semibold text-neutral-700"
                  placeholder="Profile Url"
                  placeholderTextColor="gray"
                />
              </View>

              <View style={{ flex: 1, height: hp(6.5), justifyContent: 'center', alignItems: 'center' }} className="bg-indigo-500 rounded-xl justify-center items-center pt-5">
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleUpdateProfile} style={{ height: hp(6.5) }}>
                    <Text style={{ fontSize: hp(2.7) }} className="text-black font-bold tracking-wider">Update Profile</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{ flex: 1, height: hp(6.5), justifyContent: 'center', alignItems: 'center' }} className="bg-red-500 rounded-xl justify-center items-center pt-5 mt-4">
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleLogOut} style={{ height: hp(6.5) }}>
                    <Text style={{ fontSize: hp(2.7) }} className="text-black font-bold tracking-wider">Sign Out</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </CustomKeyboardView>
  );
}
