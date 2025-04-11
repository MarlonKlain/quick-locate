import { View, TextInput, Pressable, StyleSheet, FlatList, Text} from "react-native";
import { Feather } from "@expo/vector-icons";
import { use, useEffect, useState } from "react";
import { Item } from "../../../../backend/class/item"
import DropdownComponent from "../../../components/dropdown"
import { router } from "expo-router";

export default function Items() {
    const [itemsList, setItemsList] = useState([]);
    const [search, setSearch] = useState("")
    // Set "description" as the default filter
    const [column , setColumn] = useState('description');
    const [sorter, setSorter] = useState("")
    const [refresh, setRefresh] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [sorterValue, setSorterValue] = useState(null);

    let item = new Item();
    
    // Load all items from the database
    async function loadDataFromDatabase() {
        try {
            item.getItemsListFromDatabase()
                .then((response) => {
                        setItemsList(response.items)
                })
        } catch (error) {
            console.log(error)
        }
    }
    
    // Handle pull-to-refresh functionality
    const handleRefresh = async () => {
        setRefresh(true)
        loadDataFromDatabase()
        setRefresh(false)
    }

    // Apply filters when search parameters change
    function handleFilters(search, column, sorter){
        if(search){
            item.filter(column, search, sorter)
            .then((response) => {
                    setItemsList(response.filterResult)
            })
        }
    }

    useEffect(() => {
        loadDataFromDatabase()
    }, []);   

    useEffect(() => {
        handleFilters(search, column, sorter)
    },[search, column, sorter])

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
                        value={search}
                    />
                        <Feather name="search" size={24} color="#2295BB" />
                </View>
            </View>
            <View style={styles.filters}>
                {/* Dropdown menu component */}
                <DropdownComponent 
                    filters={[{ label: 'Código', value: 'code' }, { label: 'Partnumber', value: 'partnumber' }, { label: 'Descrição', value: 'description' }, { label: 'Localização', value: 'location' }]}
                    // Default text shown before selection
                    label={"Filtros"}
                    // Updates column state when a filter is selected
                    onSendValue={setColumn}
                    value={filterValue}
                    // Callback to update parent component's state
                    setValue={setFilterValue}
                />

                <DropdownComponent 
                    filters={[{ label: 'Ordem Crescente', value: 'ASC' }, { label: 'Ordem Decrescente', value: 'DESC' }]}
                    label={"Ordenar"}
                    onSendValue={setSorter}
                    value={sorterValue}
                    setValue={setSorterValue}
                />
                {/* Reset all filters to default */}
                <Pressable
                    onPress={() => {
                        loadDataFromDatabase();
                        setSearch("");
                        setColumn("description"); 
                        setSorter("");            
                        setFilterValue(null);    
                        setSorterValue(null);
                    }}
                    style={styles.cleanFilter}
                >
                    <Text style={{ textAlign: "center", color: "white", fontFamily: "Roboto-Bold", fontSize: 12 }}>
                        Limpar Filtros
                    </Text>
            </Pressable>
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
                    refreshing={refresh}
                    onRefresh={handleRefresh}
                    data={itemsList}
                    renderItem={({ item }) => (
                        // Long press navigates to item details
                        <Pressable onLongPress={() => router.push(`./${item.code}`)}>
                            <View style={styles.row}>
                                {/* Green square indicates free location */}
                                {item.code ? (
                                    <Text style={styles.cell}>{item.code}</Text>
                                ) : (
                                    <View style={styles.freeLocation} />
                                )}
                                {/* Null coalescing operator (??) returns right-hand value if left is null/undefined */}
                                <Text style={styles.cell}>{item.partnumber ?? ""}</Text>
                                <Text style={styles.cell}>{item.description ?? ""}</Text>
                                <Text style={styles.cell}>{item.location}</Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.code ?? item.location}
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
    cleanFilter: {
        backgroundColor:"#F5B236",
        height: 30,
        width:110,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginHorizontal:8,
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        justifyContent:"center",
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
        alignItems:"center"
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontFamily: 'Roboto-Regular'
    },
    filters:{
        flex:0.05,
        flexDirection:"row",
    }, 
    freeLocation: {
        flex:1,
        width: 20,  
        height: 20,
        backgroundColor: "green",
        alignSelf: "center",
        borderRadius: 4,
        marginLeft:5
    },
});