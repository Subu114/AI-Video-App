import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'
import { StatusBar } from 'expo-status-bar'


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 w-20">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6 mt-10"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style = {{color : color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          
          tabBarActiveTintColor : "#FFA001",
          tabBarInactiveTintColor : "#CDCDE0",
          tabBarStyle : {
            backgroundColor : "#161622",
            borderTopWidth : 0,
            shadowColor : "#FFF",
            shadowOffset : {
              width : 1,
              height : 2
            },
            borderTopColor : "#232533",
            height : 84
          },
          
        }}
        >
        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )

          }}
        />
        <Tabs.Screen
          name='bookmark'
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            )

          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            )

          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )

          }}
        />
      </Tabs>
      
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default TabsLayout