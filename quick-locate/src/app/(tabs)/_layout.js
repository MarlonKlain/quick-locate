import { Tabs } from "expo-router";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons"

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="(items)" 
                options={{
                    // Hide the header
                    headerShown: false,
                    // Header title (also used as bottom tab name)
                    title: "Items",
                    tabBarActiveTintColor: "#2295BB",
                    tabBarIcon: ({focused, color, size}) => {
                        // Change tab color when selected
                        if(focused){
                            return <Feather name="box" color={"#2295BB"} size={24}/>
                        }
                        return <Feather name="box" color={color} size={size} />
                    }
                }} 
            />
            <Tabs.Screen 
                name="locations" 
                options={{
                    headerShown: false, 
                    title: "Locations",
                    tabBarActiveTintColor: "#2295BB",
                    tabBarIcon: ({focused, color, size}) => {
                        if(focused){
                            return <MaterialIcons name="location-pin" color={"#2295BB"} size={24}/>
                        }
                        return <MaterialIcons name="location-pin" color={color} size={size} />
                    }
                }} 
            />
            {/* <Tabs.Screen 
                name="import" 
                options={{
                    headerShown: false, 
                    title: "Import",
                    tabBarActiveTintColor: "#2295BB",
                    tabBarIcon: ({focused, color, size}) => {
                        if(focused){
                            return <FontAwesome6 name="file-import" color={"#2295BB"} size={24}/>
                        }
                        return <FontAwesome6 name="file-import" color={color} size={size} />
                    }
                }} 
            /> */}
            <Tabs.Screen 
            name="user"
            options={{
                headerShown: false,
                title: "User",
                tabBarActiveTintColor:"#2295BB",
                tabBarIcon: ({focused, color, size}) => {
                    if(focused){
                        return <FontAwesome5 name="user-circle" color={"#2295BB"} size={24}/>
                    }
                        return <FontAwesome5 name="user-circle" color={color} size={size} />
                }
            }}
            />
        </Tabs>
    )
}