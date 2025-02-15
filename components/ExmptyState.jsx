import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from "../components/CustomButton"
import { router } from 'expo-router'

const ExmptyState = ({title, subtitle}) => {
    console.log("title:", title)
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[250px]"
                resizeMode='contain'
            />
            <Text className="text-xl text-center font-psemibold text-white mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>
            <CustomButton 
                title={"Create Video"}
                containerStyles={"w-full my-5"}
                handlePress={() => {router.push('/create')}}
            />
        </View>
    )
}

export default ExmptyState