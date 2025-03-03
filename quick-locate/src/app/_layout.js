import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from "react";
import { Stack } from "expo-router"
import { SQLiteProvider } from "expo-sqlite";
import { createLocalDatabase} from '../../backend/database/local-database-CRUD.js'

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
      <SQLiteProvider databaseName="items-local-database.db" onInit={createLocalDatabase}>
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="login" options={{headerShown:false}} />
            <Stack.Screen name="sign-up" options={{headerShown:false}} />
            <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        </Stack>
      </SQLiteProvider>
    )
}