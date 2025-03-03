import { Link } from "expo-router";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";

export default function Index() {
    return (
        <View style={styles.welcomeContainer}>
                <Image style={styles.quickLocateImg} source={require("../../assets/images/quick-locate-index.png")}/>
                <View>
                    <Link href={"login"} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                    </Link>
                    <Link href={"sign-up"} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                    </Link>
                    <Link href={"/dashboard"} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Dashboard</Text>
                        </Pressable>
                    </Link>
                </View>
        </View>  
    )
}

const styles = StyleSheet.create({
    welcomeContainer:{
        flex:1,
        alignItems: "center",
        justifyContent:"center"
    },
    quickLocateImg:{
        resizeMode: "center",
        width: 352,
        height: 400,
        marginTop:50,
        marginBottom:50
    },
    button:{
        margin:7.5,
        backgroundColor:"#2295BB",
        borderRadius:10,
        width:274,
        height:59,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonText:{
        textAlign:"center",
        fontSize: 30,
        color:"white",
        fontFamily: 'Roboto-Bold'
    },

})

