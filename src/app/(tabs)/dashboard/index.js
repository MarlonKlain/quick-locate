import { View, TextInput, Pressable, StyleSheet, FlatList, Text } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Item } from "../../../../backEnd/class/item";
import { useEffect, useState } from "react";

export default function Items() {
    const [itemsList, setItemsList] = useState([]);

    let item = new Item();

    useEffect(() => {
        item.listItems()
            .then((response) => {
                setItemsList(response.items || []);
                console.log("Hook (Updated): ", response);
            });
    }, []);    

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Pressable style={styles.dropdownButton}>
                        <FontAwesome name="sort-down" size={20} color="white" />
                    </Pressable>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                    />
                    <Pressable style={styles.searchIconContainer}>
                        <Feather name="search" size={24} color="#2295BB" />
                    </Pressable>
                </View>
            </View>

            {/* FlatList with Table Layout */}
            <View style={styles.productContainer}>
                {/* Table Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Code</Text>
                    <Text style={styles.headerText}>Part Number</Text>
                    <Text style={styles.headerText}>Description</Text>
                    <Text style={styles.headerText}>Location</Text>
                </View>

                <FlatList
                    data={itemsList}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.code}</Text>
                            <Text style={styles.cell}>{item.partnumber}</Text>
                            <Text style={styles.cell}>{item.description}</Text>
                            <Text style={styles.cell}>{item.item_location}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.code}
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
        flex: 0.25,
        width: "90%",
        paddingTop: 40,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
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
    productContainer: {
        flex: 0.75,
        width: "95%",
        paddingTop: 10,
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#2295BB",
        padding: 10,
        borderRadius: 5,
    },
    headerText: {
        flex: 1,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});
