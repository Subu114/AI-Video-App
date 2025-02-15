import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View
            className={`w-full h-16 px-4 bg-black-100 border-2 rounded-2xl ${isFocused ? 'border-secondary-200' : 'border-black-200'} items-center flex-row space-x-4`}
        >
            <TextInput
                placeholder="Seach for a video topic" 
                value={value}
                onChangeText={handleChangeText}
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                placeholderTextColor="#7B7B8B"

            />
            <TouchableOpacity onPress={() => {}}>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput