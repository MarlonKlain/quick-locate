import { View, StyleSheet, Button } from "react-native";
import { router } from "expo-router";

export default function Logout() {
    return(
        <View style={styles.container}>
            {/* A simple logout that sends the user back to the login screen */}
            <Button title="Logout" onPress={() => router.replace("/login")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",

    }
})