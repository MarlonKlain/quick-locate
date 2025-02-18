import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function Items() {
    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    {/* Botão Dropdown */}
                    <Pressable style={styles.dropdownButton}>
                        <FontAwesome name="sort-down" size={20} color="white" />
                    </Pressable>

                    {/* Campo de Pesquisa */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                    />

                    {/* Ícone de Pesquisa */}
                    <Pressable style={styles.searchIconContainer}>
                        <Feather name="search" size={24} color="#2295BB" />
                    </Pressable>
                </View>
            </View>
            <View style={styles.productContainer}>

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
        flex:0.25,
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
        flex:0.75
    },
});
