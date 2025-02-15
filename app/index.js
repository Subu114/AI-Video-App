import { ScrollView, Text, Image, View, StatusBar } from 'react-native';
import { Redirect, router } from 'expo-router';
import "../global.css"
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href='/home' />
  }
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full min-h-[95vh] justify-center items-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode='contain'
            />
            <Image
              source={images.cards}
              className="w-max-[380px] w-full h-[300px]"
              resizeMode='contain'
            />
            <View className="relative mt-5">
              <Text className="text-4xl text-white font-bold text-center">Discover Endless
                Possibilities with{' '}
                <Text className='text-secondary-200'>Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode='contain'
              />
            </View>
            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
              Where creativity meets innocation: embark on a journey of limitless exploration with Aora.
            </Text>
            <CustomButton
              title="Continue with email"
              handlePress={() => { router.push('/sign-in') }}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622' style='light' />
      </SafeAreaView>

    );
  }


