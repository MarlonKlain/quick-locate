import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from "react";
import { Stack } from "expo-router"

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded, error] = useFonts ({
        'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    })

    useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }, [loaded, error]);
    
      if (!loaded && !error) {
        return null;
      } 
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="(tabs)" options={{headerShown:false}} />
            <Stack.Screen name="(auth)/login" options={{headerShown:false}} />
            <Stack.Screen name="(auth)/sign-up" options={{headerShown:false}} />
        </Stack>
    )
}