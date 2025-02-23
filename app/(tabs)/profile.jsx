import { View, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React  from 'react'
import { router } from 'expo-router'


import ExmptyState from '../../components/ExmptyState'
import VideoCard from '../../components/VideoCard'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

const Profile = () => {
  const { setIsLoggedIn, user, setUser } = useGlobalContext()
  const { data: posts, loading, refetch } = useAppwrite(() => getUserPosts(user.$id))

  const logOut = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}

        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className='w-full items-end mb-10'
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover'
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subTitle = 'Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
                />

              <InfoBox
                title='1.2k'
                subTitle = 'Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <ExmptyState
            title="No Videos Found"
            subtitle="No videos found for this search..."
          />

        )}

        refreshControl={<RefreshControl />}
      />
    </SafeAreaView>
  )
}

export default Profile