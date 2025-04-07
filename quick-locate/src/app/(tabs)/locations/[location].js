import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native";
// import { useLocalDatabase } from "../../../../backend/database/local-database-CRUD";
import { FlatList } from "react-native";
import { Locations } from "../../../../backend/class/locations";
import BackButton from "../../../components/back-button";


export default function ScreenItemsByLocation(){
  const [itemsByLocation, setItemsByLocation] = useState();
  const {location} = useLocalSearchParams();
  const itemByLocationList = new Locations();

  useEffect(() => {
    itemByLocationList.getLocations(location).
    then((response) => {
      console.log(response)
      setItemsByLocation(response.itemsByLocation)
    })
    
  }, [location])
  return(
    <View style={styles.container}>
      <BackButton />
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
        <View style={{flex:1, width:"100%"}}>
          <FlatList
          data={itemsByLocation}
          renderItem={({item}) => (
              <View style={styles.row}>
                {item.code ? (
                    <Text style={styles.cell}>{item.code}</Text>
                ) : (
                    <View style={styles.freeLocation} />
                )}
                <Text style={styles.cell}>{item.partnumber}</Text>
                <Text style={styles.cell}>{item.description}</Text>
                <Text style={styles.cell}>{item.location}</Text>
              </View>
          )}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
    paddingVertical:10,
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
    justifyContent:"center",
    borderRadius:5,
    padding:5,
    width:"100%"
  },
  itemsListHeaderText:{
    width:"25%",
    color:"white",
    fontFamily:"Roboto-Bold",
    paddingVertical:10,
    fontSize:15,
    textAlign:"center"
  },
  row:{
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 20,
    alignItems:"center",
  },
  cell:{
    width:"25%",
    textAlign: "center",
    fontFamily: 'Roboto-Regular',
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
})