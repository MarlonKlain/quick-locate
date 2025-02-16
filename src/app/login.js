import { Link } from "expo-router";
import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";

export default function Login() {
    return (
        <View style={style.container}>
            <View style={style.welcomeContainer}>
                <Text style={style.welcomeText}>Welcome</Text>
            </View>
            <View style={style.loginContainer}>
                <View style={style.inputContainer}>    
                    <Text style={style.textField}>User</Text>
                    <TextInput style={style.inputField}></TextInput>
                    <Text style={style.textField}>Password</Text>
                    <TextInput style={style.inputField}></TextInput>
                </View>
                <View style={style.buttonContainer}>
                    <Pressable style={style.button}>
                        <Text style={style.buttonText}>Login</Text>
                    </Pressable>
                    <View>
                        {/* Create a condition to change the color of the confirm button */}
                        <Text style={{...style.buttonText, fontSize:20, marginBottom:5}}>Already have an account?</Text>
                        <Link href={"sign-up"} asChild>
                            <Pressable style={style.button}>
                                <Text style={style.buttonText}>Sign Up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1
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