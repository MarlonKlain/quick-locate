import { View, TextInput, Pressable, StyleSheet, FlatList, Text} from "react-native";
import { Feather } from "@expo/vector-icons";
import { use, useEffect, useState } from "react";
import { Item } from "../../../../backend/class/item"
import DropdownComponent from "../../../components/dropdown"
import { router } from "expo-router";

export default function Items() {
    const [itemsList, setItemsList] = useState([]);
    const [search, setSearch] = useState("")
    //set the filter to "description" as default
    const [column , setColumn] = useState('description');
    const [sorter, setSorter] = useState("")
    const [refresh, setRefresh] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [sorterValue, setSorterValue] = useState(null);


    let item = new Item();
    
    //loading all the items from the database
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
    
    //this function will handle when the user rolldown the list to update
    const handleRefresh = async () => {
        setRefresh(true)
        loadDataFromDatabase()
        setRefresh(false)
    }

    //this useEffect will handle when the user changes the filter to search
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
                {/* This component is a dropdown menu, each label is the text that apears to the user and value is the respective value */}
                <DropdownComponent 
                    filters={[{ label: 'Código', value: 'code' }, { label: 'Partnumber', value: 'partnumber' }, { label: 'Descrição', value: 'description' }, { label: 'Localização', value: 'location' }]}
                    // label is the default text the are shown before the user select something
                    label={"Filtros"}
                    //When selected a filter, it will pass the value to the column hook
                    onSendValue={setColumn}
                    value={filterValue}
                    // We pass the setSorterValue function from the parent component to the child.
                    // This allows the child component to update the state that lives in the parent.
                    // In this way, the parent "controls" the selected value, and the child acts as a controlled component.
                    // The child uses the setValue={setSorterValue} prop to notify the parent of changes.
                    setValue={setFilterValue}
                />

                <DropdownComponent 
                    filters={[{ label: 'Ordem Crescente', value: 'ASC' }, { label: 'Ordem Decrescente', value: 'DESC' }]}
                    label={"Ordenar"}
                    onSendValue={setSorter}
                    value={sorterValue}
                    setValue={setSorterValue}
                />
                {/* This button will set the filters to default */}
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
                        // When longing pressing on an item, it will open a new screen with the item`s information
                        <Pressable onLongPress={() => router.push(`./${item.code}`)}>
                            <View style={styles.row}>
                                {/* Green Square if location is free */}
                                {item.code ? (
                                    <Text style={styles.cell}>{item.code}</Text>
                                ) : (
                                    <View style={styles.freeLocation} />
                                )}
                                {/* The ?? operator (null coalescing) evaluates to the right-hand side if and only if the left-hand side is either null or undefined. */}
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
        width: 20,  // Adjust size as needed
        height: 20, // Adjust size as needed
        backgroundColor: "green",
        alignSelf: "center", // Centers it within the row
        borderRadius: 4, // Optional: makes it a rounded square
        marginLeft:5
    },
    
});
