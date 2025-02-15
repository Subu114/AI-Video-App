import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { useVideoPlayer, VideoView } from 'expo-video'

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)
    const player = useVideoPlayer(video, (player) => {
        player.loop = true;
    });
    const togglePlay = () => {
        if (play) {
            player.pause();
        } else {
            player.play();
        }
        setPlay(!play);
    };
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode='cover'
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
                </View>
            </View>
            {play ? (
                <VideoView
                    player={player}
                    style={styles.video}
                    allowsFullscreen
                    allowsPictureInPicture
                    nativeControls
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={togglePlay}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode='contain'

                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    video : {
        width : '100%',
        height : 210 
    }
})

export default VideoCard