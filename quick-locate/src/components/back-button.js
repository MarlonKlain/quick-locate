import { Pressable, View, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"

export default function BackButton(){
    return (
        <View>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Feather name="chevron-left" size={30} color={"black"}/>
            </Pressable>
        </View>        
    )
}

const styles = StyleSheet.create({
    backButton:{
        backgroundColor:"gray",
        alignSelf:"flex-start",
        borderRadius:15,
        marginBottom:10,
    },

})