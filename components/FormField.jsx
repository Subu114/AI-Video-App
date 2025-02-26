import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium mb-1'>{title}</Text>
      <View 
        className={`w-full h-16 px-4 bg-black-100 border-2 rounded-2xl ${isFocused ? 'border-secondary-200' : 'border-black-200'} items-center flex-row`}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          className="flex-1 text-white font-psemibold text-base"
          placeholderTextColor="#7B7B8B"
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
            
          
        />
        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image 
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6 "
                resizeMode='contain'
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField