import { View, TextInput, Pressable, StyleSheet, FlatList, Text, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Item } from "../../../backend/class/item"
import { useLocalDatabase } from '../../../backend/database/local-database-CRUD'
import DropdownComponent from "../../components/dropdown"
import { Link, router } from "expo-router";

export default function Items() {
    const [itemsList, setItemsList] = useState([]);
    const [search, setSearch] = useState()
    const [filter , setFilter] = useState('description');
    const [sorter, setSorter] = useState()
    const localDatabase = useLocalDatabase();
    let item = new Item();
    

    async function listSearch(name, column) {
        try {
            const response = await localDatabase.filter(name, column)
            if (sorter == "OC"){
                response.sort((a, b) => a[column] - b[column])
            } else if (sorter ==  "OD"){
                response.sort((a, b) => b[column] - a[column])
            }
            setItemsList(response)
        } catch (error) {
            console.log("listSearch: ", error);
            
        }
    }

    useEffect(() => {
        item.listItems()
            .then(async (response) => {
                setItemsList(await localDatabase.getAllLocalData())
            });
    }, []);    

    useEffect(() =>{
        listSearch(search, filter)
    },[search])

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                        onChangeText={setSearch}

                    />
                    <Pressable style={styles.searchIconContainer}>
                        <Feather name="search" size={24} color="#2295BB" />
                    </Pressable>
                </View>
            </View>
            <View style={styles.filters}>
                <DropdownComponent filters={[
                    { label: 'Código', value: 'code' },
                    { label: 'Partnumber', value: 'partnumber' },
                    { label: 'Descrição', value: 'description' },
                    { label: 'Localização', value: 'item_location' },
                ]}
                label={"Filtros"}
                onSendValue={setFilter}/>
                <DropdownComponent 
                filters={[
                    { label: 'Ordem Crescente', value: 'OC' },
                    { label: 'Ordem Decrescente', value: 'OD' },
                ]}
                label={"Ordenar"}
                onSendValue={setSorter}/>
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
                            <Pressable onLongPress={()=> router.push(`./items/${item.code}`)}>
                                <View style={styles.row}>
                                    <Text style={styles.cell}>{item.code}</Text>
                                    <Text style={styles.cell}>{item.partnumber}</Text>
                                    <Text style={styles.cell}>{item.description}</Text>
                                    <Text style={styles.cell}>{item.item_location}</Text>
                                </View>
                            </Pressable>
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
        flex: 0.1,
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
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },  
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
        flex: 0.85,
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
        fontFamily: 'Roboto-Regular'
    },
    filters:{
        flex:0.05,
        flexDirection:"row",
    }
});
