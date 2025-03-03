import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useLocalDatabase } from "../../../../backend/database/local-database-CRUD";
import { useEffect, useState } from "react";
import { Locations } from "../../../../backend/class/locations";


export default function Items() {
    const [locations, setLocations] = useState()
    const localDatabase = new useLocalDatabase();
    const APIlocations = new Locations();


    useEffect(() => {
        APIlocations.getAllLocations()
        .then(async (response) => {
            console.log("Aqui: ", response);
            
        })

    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    {/* Campo de Pesquisa */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                    />

                    {/* Ícone de Pesquisa */}
                    <View style={styles.searchIconContainer}>
                        <Feather name="search" size={24} color="#2295BB" />
                    </View>
                </View>
            </View>
            <View style={styles.addLocationContainer}>
                <Pressable style={styles.AddLocationButton}>
                    <Text style={styles.addButtonText}>Add location</Text>
                </Pressable>
            </View>
            <View style={styles.productContainer}>
                <View style={styles.locationsTitleTextContainer}>
                    <Text style={styles.locationsTitleText}>Locations</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    searchBarContainer: {
        flex:0.10,
        width: "90%",
        paddingTop:40,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2295BB",
    },
    dropdownButton: {
        width: 50,
        height: 50,
        backgroundColor: "#2295BB",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        fontSize: 16,
        color: "#333",
    },
    searchIconContainer: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    productContainer:{
        flex:0.8
    },
    addLocationContainer:{
        flex:0.1,
        justifyContent:"center"
    },
    AddLocationButton:{
        backgroundColor: "#F5B236",
        borderRadius:10
    },
    addButtonText:{
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        padding:12,
        color:"white"
    },
    locationsTitleText:{
        color:"white",
        backgroundColor:"#2295BB",
        fontFamily: "Roboto-Bold",
        textAlign:"center",
        fontSize:30
    },
    locationsTitleTextContainer:{
        width:500,
        height:50,
        marginTop:10,
    }
});
 