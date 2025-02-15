import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
    const pathName = usePathname()
    const [query, setQuery] = useState(initialQuery || "")
    const onSearch = () => {
        if (!query)
            return Alert.alert("Missing query! Please input something to search...")
        if (pathName.startsWith('/search'))
            router.setParams({ query })
        else
            router.push(`/search/${query}`)
    }

    return (
        <View
            className={`w-full h-16 px-4 bg-black-100 border-2 rounded-2xl border-black-200 items-center flex-row space-x-4`}
        >
            <TextInput
                placeholder="Seach for a video topic"
                value={query}
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
                onSubmitEditing={onSearch}
            />
            <TouchableOpacity
                onPress={onSearch}
            >
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View >
    )
}

export default SearchInput