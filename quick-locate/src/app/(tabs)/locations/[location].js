import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native";
// import { useLocalDatabase } from "../../../../backend/database/local-database-CRUD";
import { FlatList } from "react-native";
import { Locations } from "../../../../backend/class/locations";


export default function ScreenItemsByLocation(){
  const [itemsByLocation, setItemsByLocation] = useState();
  const { location } = useLocalSearchParams();
  const itemByLocationList = new Locations();
  

  useEffect(() => {
    itemByLocationList.getLocations(location)
    .then((response) => {
      console.log(response);
      
    })
  }, [location])

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Lista de items da localização:</Text>
        <Text style={styles.headerText}>{location}</Text>
      </View>
      <View style={styles.itemsList}>
        <View style={styles.itemsListHeaderContainer}>
          <Text style={styles.itemsListHeaderText}>Código</Text>
          <Text style={styles.itemsListHeaderText}>Partnumber</Text>
          <Text style={styles.itemsListHeaderText}>Descrição</Text>
          <Text style={styles.itemsListHeaderText}>Localização</Text>
        </View>
        <FlatList
        data={itemsByLocation}
        renderItem={({item}) => (
          <Pressable>
            <View style={styles.row}>
              <Text style={styles.cell}>{item.code}</Text>
              <Text style={styles.cell}>{item.partnumber}</Text>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.location}</Text>
            </View>
          </Pressable>
        )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20
  },
  headerContainer:{
    flex:0.15,
    alignItems:"center",
    justifyContent:"center"
  },
  headerText:{
    fontFamily:"Roboto-Bold",
    fontSize:24,
  },
  itemsList:{
    flex:0.85,
    alignItems:"center"
  },
  itemsListHeaderContainer:{
    backgroundColor:"#2295BB",
    flexDirection:"row",
    width:"100%",
    justifyContent:"center",
    borderRadius:5,
    padding:5
  },
  itemsListHeaderText:{
    color:"white",
    fontFamily:"Roboto-Bold",
    paddingHorizontal:10,
    paddingVertical:5,
    fontSize:15
  },
  row:{
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    alignItems:"center"
  },
  cell:{
    width:"25%",
    textAlign: "center",
    fontFamily: 'Roboto-Regular',
  }
})