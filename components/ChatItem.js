import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common'


export default function ChatItem({item, router, noBorder}) {

    const openChatRoom = ()=>{
        router.push({pathname: '/chatRoom', params: item});
    }

  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? '': 'border-b border-b-neutral-200'} `}>
        <Image 
            source={item?.profileUrl}
            style={{height: hp(6), width: hp(6), borderRadius: 100 }}
            className="rounded-full"
            placeholder={blurhash}
            transition={500} 
        />

        {/* name and last masseges */}
        <View className="flex-1 gap-1">
            <View className="flex-row justify-between ">
                <Text className="font-semibold text-neutral-800" style={{fontSize: hp(1.8)}}>{item?.username}</Text>
                <Text className="font-medium text-neutral-500" style={{fontSize: hp(1.6)}}>Time</Text>
            </View>
            <Text className="font-medium text-neutral-500" style={{fontSize: hp(1.6)}}>Last message</Text>
        </View>

    </TouchableOpacity>

  )
}