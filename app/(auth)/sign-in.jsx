import { View, Text,ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'


import "../../global.css"
import {images} from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    email : "",
    password : ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const submit = async() => {
      if(!form.email || !form.password) {
        Alert.alert("Error", "Please fill all the fields!")
      }
      setIsLoading(true)
      try {
        await signIn(form.email, form.password)
  
        //set it to global state
        const result = await getCurrentUser()
        setUser(result)
        setIsLoggedIn(true)
  
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
        <View className='w-full justify-center min-h-[90vh] px-4 my-6'> 
          <Image 
          source={images.logo}
          resizeMode='contain' 
          className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 text-semibold font-psemibold">Log In to Aura</Text>
        
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
        title={"Sign In"}
        containerStyles="mt-7"
        handlePress={submit}
        isLoading={isLoading}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">Don't Have an Account?</Text>
          <Link href="/sign-up" className='text-lg font-psemibold text-secondary-200'>Sign Up</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn