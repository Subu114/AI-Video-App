import { View, Text,ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'


import "../../global.css"
import {images} from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { routeToScreen } from 'expo-router/build/useScreens'

const SignUp = () => {
  const [form, setForm] = useState({
    username : "",
    email : "",
    password : ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const submit = async() => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields!")
    }
    setIsLoading(true)
    try {
      const result = await createUser(form.email, form.password, form.username)

      //set it to global state


      router.push("/home")


    } catch (error) {
      console.log("Error : ", error)
      Alert.alert("Error", error.message)
      
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'> 
          <Image 
          source={images.logo}
          resizeMode='contain' 
          className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 text-semibold font-psemibold">Sign Up to Aura</Text>
        
        <FormField 
        title="Username"
        value={form.username}
        handleChangeText={(text) => setForm({...form, username : text})} 
        otherStyles = "mt-10"
        placeholder={"your username"}
        />
        <FormField 
        title="Email"
        value={form.email}
        handleChangeText={(text) => setForm({...form, email : text})} 
        otherStyles = "mt-7"
        keyboardType="email-address"
        placeholder={"your email"}
        />
        <FormField 
        title="Password"
        value={form.password}
        handleChangeText={(text) => setForm({...form, password : text})} 
        otherStyles = "mt-7"
        placeholder={"your password"}
        />
        <CustomButton 
        title={"Sign Up"}
        containerStyles="mt-7"
        handlePress={submit}
        isLoading={isLoading}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">Already Have an Account?</Text>
          <Link href="/sign-in" className='text-lg font-psemibold text-secondary-200'>Sign In</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp