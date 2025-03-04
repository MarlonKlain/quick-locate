import { View, TextInput, Pressable, StyleSheet, Text, FlatList, Modal} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Locations } from "../../../../backend/class/locations"

export default function Items() {
    const [locations, setLocations] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false)
    const [newLocation, setNewLocation] = useState()
    const APIlocations = new Locations();

    useEffect(() => {
        APIlocations.getAllLocations().then(async (response) => {
            setLocations(response.locations);
        });
    }, []);

    useEffect(()=>{
        APIlocations.getAllLocations().then(async (response) => {
            setLocations(response.locations);
        });
    }, [isModalVisible])

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#555" />
                    <View style={styles.searchIconContainer}>
                        <Feather name="search" size={24} color="#2295BB" />
                    </View>
                </View>
            </View>
            <View style={styles.addLocationContainer}>
                <Pressable style={styles.AddLocationButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>Add location</Text>
                </Pressable>
            </View>
            <Modal
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
            animationType="fade"
            presentationStyle="pageSheet">
                <View style={styles.modalAddLocation}>
                    <Text style={styles.modalTextAddLocation}>Insira a nova localização</Text>
                    <TextInput style={styles.modalTextInput}
                    onChangeText={setNewLocation}></TextInput>
                    <View style={{flexDirection:"row"}}>
                        <Pressable style={{...styles.modalButtons, marginRight:15}} onPress={async () => await APIlocations.registerNewLocation(newLocation)}>
                            <Text>Confirm</Text>
                        </Pressable>
                        <Pressable style={styles.modalButtons} onPress={() => setModalVisible(false)}>
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.productContainer}>
                <View style={styles.locationsTitleTextContainer}>
                    <Text style={styles.locationsTitleText}>Locations</Text>
                </View>
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{item.item_location}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id_location.toString()}
                    numColumns={2}
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
        flex: 0.8,
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
    },
    locationsTitleTextContainer: {
        width: "100%",
        marginVertical: 10,
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        flex: 1,
        backgroundColor: "white",
        margin: 8,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        marginHorizontal:20
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
