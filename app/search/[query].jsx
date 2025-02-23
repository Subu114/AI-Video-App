import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

import SearchInput from '../../components/SearchInput'
import ExmptyState from '../../components/ExmptyState'
import VideoCard from '../../components/VideoCard'
import useAppwrite from '../../lib/useAppwrite'
import {searchPosts } from '../../lib/appwrite'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, loading, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}

        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Result
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
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

export default Search