import { View, TextInput, Pressable, StyleSheet, Text, FlatList, Modal, Alert} from "react-native";
import { useEffect, useState } from "react";
import { Locations } from "../../../../backend/class/locations"
import { router } from "expo-router";



export default function Items() {
    const [locationsList, setLocationsList] = useState();
    const locations = new Locations();


    function deleteLocation (location) {
        Alert.alert(`DELETAR LOCALIZAÇÃO ${location}?`, 'Escolha uma opção', [
          { text: 'Cancelar', style: 'cancel'},
          { text: '', style: 'cancel' },
          { text: 'DELETAR', onPress: async () => await APIlocations.deleteLocationDatabase(location), style: 'destructive' },
        ]);
      };
    
    useEffect(()=>{
        locations.getLocations()
        .then((response) => {
            setLocationsList(response.locations)
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.productContainer}>
                <View style={styles.locationsTitleTextContainer}>
                    <Text style={styles.locationsTitleText}>Localizações</Text>
                </View>
                <FlatList
                    data={locationsList}
                    renderItem={({ item }) => (
                        <Pressable onLongPress={() => deleteLocation(item.first_character)} onPress={() => router.push(`./locations/${item.first_character}`)}>
                            <View style={styles.card}>
                                <Text style={styles.cardText}>{item.first_character}</Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.first_character}
                    numColumns={4}
                    columnWrapperStyle={styles.row}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        paddingHorizontal:20,
    },
    searchBarContainer: {
        flex: 0.1,
        width: "90%",
        paddingTop: 40,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2295BB",
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
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
        justifyContent: "center",
        alignItems: "center",
    },
    productContainer: {
        flex: 1,
        width: "100%",
    },
    addLocationContainer: {
        flex: 0.1,
        justifyContent: "center",
    },
    AddLocationButton: {
        backgroundColor: "#F5B236",
        borderRadius: 10,
        padding: 12,
        alignItems: "center",
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    addButtonText: {
        fontSize: 16,
        color: "white",
    },
    locationsTitleText: {
        color: "white",
        backgroundColor: "#2295BB",
        textAlign: "center",
        fontSize: 24,
        paddingVertical: 10,
        fontFamily:"Roboto-Bold",
        borderRadius: 12,
    },
    locationsTitleTextContainer: {
        width: "100%",
        marginBottom:10,
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        width:170,
        backgroundColor: "white",
        marginTop:5,
        marginVertical:5,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    cardText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2295BB",
    },
    modalAddLocation:{
        flex:1,
        padding:20,
        backgroundColor:"gray",
        alignContent:"center",
        alignItems:"center"
    },
    modalTextAddLocation:{
        textAlign:"justify",
        fontSize:20,
        color:"white",
        fontFamily: "Roboto-Bold",
    },
    modalTextInput:{
        backgroundColor:"white",
        width: "90%",
        height: 50,
        borderRadius:10,
        marginVertical:10
    },
    modalButtons:{
        backgroundColor:"#F5B236",
        borderRadius:10,
        width:146,
        height:41,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end",
    }
});
