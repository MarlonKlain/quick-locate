// Login page component
import { Link, router } from "expo-router";
import { Text, TextInput, View, Pressable, StyleSheet, Alert, SafeAreaView } from "react-native";
import { useState } from "react";
import { User } from "../../../backend/class/user";

export default function Login() {
    // Hooks to store the user's login information
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        // Main container
        <SafeAreaView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome</Text>
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>    
                    <Text style={styles.textField}>User</Text>
                    <TextInput 
                        style={styles.inputField}
                        value={username}
                        onChangeText={setUsername}>
                    </TextInput>
                    <Text style={styles.textField}>Password</Text>
                    <TextInput 
                        style={styles.inputField}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}>
                    </TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    {/* When the user fills in username and password fields, this information is sent to the server for validation */}
                    <Pressable style={styles.button} onPress={() => {
                        // When the "Confirm" button is pressed, it creates a new User instance
                        // with the entered credentials and validates them on the server side
                        let user = new User("", "", username , "" , password);
                        user.login()
                        .then((response) => {
                            if(response.message != "User found"){
                                Alert.alert(response.message)
                            } else {
                                router.dismissAll()
                                router.replace("/(tabs)")
                            }
                        })
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <View>
                        <Text style={{...styles.buttonText, fontSize:20, marginBottom:5}}>Already have an account?</Text>
                        <Link href={"sign-up"} asChild>
                            <Pressable style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    welcomeContainer:{
        flex:0.19,
        alignItems:"center",
        justifyContent:"center"
    },
    welcomeText:{
        fontFamily: "Roboto-Bold",
        fontSize: 48,
        color:"#2295BB"
    },
    loginContainer:{
        flex:0.91,
        backgroundColor:"#2295BB",
        borderTopRightRadius:70,
        borderTopLeftRadius:70,
    },
    inputContainer:{
        flex:0.65,
        paddingLeft:20,
        paddingRight:20,
        marginTop:10,
        justifyContent:"center"
    },
    textField:{
        fontSize:20,
        fontFamily:"Roboto-Bold",
        color:"white",
        marginBottom:5
    },
    inputField:{
        backgroundColor: "white",
        width:"auto",
        height:51,
        borderRadius:10,
        marginBottom:10
    },
    buttonContainer:{
        flex:0.35,
        alignItems:"center"
    },
    button:{
        marginBottom:20,
        backgroundColor:"#F5B236",
        borderRadius:10,
        width:274,
        height:59,
        justifyContent:"center"
    },
    buttonText:{
        textAlign:"center",
        fontSize: 30,
        color:"white",
        fontFamily: 'Roboto-Bold'
    }, 
})