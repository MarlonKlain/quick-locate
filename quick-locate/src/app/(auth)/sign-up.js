import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView} from "react-native";
import { User } from "../../../backend/class/user";

export default function Login() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setpasswordConfirm] = useState();
    
    // This method verifies if all user-provided information meets validation requirements
    const handleLogin = (firstName, lastName, username, email, password, passwordConfirm) => {
        let user = new User(firstName, lastName, username, email, password, passwordConfirm)
        user.signUp()
        .then((response) => {
            // If all validations pass, redirect user to login page
            if(response.status == 201){
                router.navigate("/login")
            } else {
                // If validation fails, show error message to user
                Alert.alert("Error", response.data.error)
            }
        })
    }
    return (
        <SafeAreaView style={style.container}>
            <View style={style.outsideTextContainer}>
                <Text style={style.outsideText}>Fill in all the</Text>  
                <Text style={style.outsideText}>fields</Text>  
            </View>
            <View style={style.infosContainer}>
                <View style={style.buttonsContainer}>
                    <View>
                        <Text style={{...style.buttonText, fontSize:14}}>Already have an account?</Text>
                        <Link href={"login"} asChild>
                            <Pressable style={{ ...style.button, marginRight: 20 }} >
                                <Text style={{...style.buttonText, fontSize:20}}>Login</Text>
                            </Pressable>
                        </Link>
                    </View>
                        <Pressable style={{...style.button, backgroundColor:"#35B369"}} onPress={() => handleLogin(firstName, lastName, username, email, password, passwordConfirm)}>
                            <Text style={{...style.buttonText, fontSize:20}}>Confirm</Text>
                        </Pressable>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.textField}>First Name</Text>
                     <TextInput 
                     style={style.inputField}
                     value={firstName}
                     onChangeText={setFirstName}></TextInput>
                    <Text style={style.textField}>Last Name</Text>
                    <TextInput 
                     style={style.inputField}
                     value={lastName}
                     onChangeText={setLastName}></TextInput>
                    <Text style={style.textField}>User</Text>
                    <TextInput 
                     style={style.inputField}
                     value={username}
                     onChangeText={setUsername}></TextInput>
                    <Text style={style.textField}>Email</Text>
                    <TextInput 
                     style={style.inputField}
                     value={email}
                     onChangeText={setEmail}></TextInput>
                    <Text style={style.textField}>Password</Text>
                    <TextInput 
                     style={style.inputField}
                     secureTextEntry={true}
                     value={password}
                     onChangeText={setPassword}></TextInput>
                    <Text style={style.textField}>Confirm Password</Text>
                    <TextInput 
                     style={style.inputField}
                     value={passwordConfirm}
                     // secureTextEntry transforms password input into asterisks (*)
                     secureTextEntry={true}
                     onChangeText={setpasswordConfirm}></TextInput>
                </View>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    outsideTextContainer:{
        flex:0.19,
        alignItems:"center",
        justifyContent:"center"
    },
    outsideText:{
        fontFamily: "Roboto-Bold",
        fontSize: 48,
        color:"#2295BB"
    },
    infosContainer:{
        flex:0.91,
        backgroundColor:"#2295BB",
        borderTopRightRadius:70,
        borderTopLeftRadius:70,
        paddingTop:15
    },
    buttonsContainer:{
        marginTop:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    buttonText:{
        color:"white",
        fontFamily:"Roboto-Bold",
        marginBottom:1
    },
    button:{
        backgroundColor:"#F5B236",
        borderRadius:10,
        width:146,
        height:41,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end"
    },
    inputContainer:{
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        marginTop:10,
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
        height:45,
        borderRadius:10,
        marginBottom:10
    }
})