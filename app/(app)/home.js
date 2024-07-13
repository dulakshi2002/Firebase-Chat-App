import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { usersRef } from '../../firebaseConfig';
import { query, where, getDocs } from 'firebase/firestore';



export default function Home() {
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(()=>{
    if(user?.uid)
      getUsers();
  },[user?.uid])
  
  const getUsers = async () => {
    setLoading(true);
    try {
      const q = query(usersRef, where('userId', '!=', user?.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error fetching users
    } finally {
      setLoading(false);
    }
  };
  

  console.log('user data: ',user);
  

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      
      {
        users.length > 0? (
          <ChatList users={users} />
        ):(
          <View className="felx items-center" style={{top: hp(30)}} >
            <ActivityIndicator size="large" />
          </View>
        )
      }

    </View>
  )
}