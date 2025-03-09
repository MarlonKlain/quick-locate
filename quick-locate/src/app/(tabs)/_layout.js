import { Tabs } from "expo-router";
import { Feather, MaterialIcons, FontAwesome6 } from "@expo/vector-icons"
import { SQLiteProvider } from "expo-sqlite";
import { createLocalDatabase } from "../../../backend/database/create-database"; 



export default function Layout() {
    return (
              <SQLiteProvider databaseName="items-local-database.db" onInit={createLocalDatabase}>
                <Tabs>
                    <Tabs.Screen name="(items)" options={{
                        headerShown:false,
                        title: "Items",
                        tabBarActiveTintColor: "#2295BB",
                        tabBarIcon: ({focused, color, size}) => {
                            if(focused){
                                return <Feather name="box" color={"#2295BB"} size={24}/>
                            }
                                return <Feather name="box" color={color} size={size} />
                        }}} />
                    <Tabs.Screen name="locations" options={{
                        headerShown:false, 
                        title: "Locations",
                        tabBarActiveTintColor: "#2295BB",
                        tabBarIcon: ({focused, color, size}) => {
                            if(focused){
                                return <MaterialIcons name="location-pin" color={"#2295BB"} size={24}/>
                            }
                                return <MaterialIcons name="location-pin" color={color} size={size} />
                        }}} />
                    <Tabs.Screen name="import" options={{
                        headerShown:false, 
                        title: "Import",
                        tabBarActiveTintColor: "#2295BB",
                        tabBarIcon: ({focused, color, size}) => {
                            if(focused){
                                return <FontAwesome6 name="file-import" color={"#2295BB"} size={24}/>
                            }
                                return <FontAwesome6 name="file-import" color={color} size={size} />
                        }}} />
                </Tabs>
            </SQLiteProvider>
    )
}