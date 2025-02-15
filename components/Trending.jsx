import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}
const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({ activeItem, item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
  });
  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
          <VideoView
            player={player}
            style = {{width : 180, height : 280, borderRadius : 20, marginTop : 3, backgroundColor : 'black'}}
            allowsFullscreen
            allowsPictureInPicture
          />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={togglePlay}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )

      }

    </Animatable.View>)
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1])
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}

      renderItem={({ item }) => (
        <TrendingItem item={item} activeItem={activeItem} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 120 }}
      horizontal
    />

  )
}

export default Trending