import { StyleSheet, Text, TextInput, View, Pressable, Modal, FlatList, Alert} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {FontAwesome} from "@expo/vector-icons"
import { Item } from '../../../../backend/class/item';
import { Locations } from '../../../../backend/class/locations';
import BackButton from '../../../components/back-button';

export default function itemDetails() {
  const [code, setCode] = useState();
  const [partnumber, setPartnumber] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  // Hook to control modal visibility
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationsList, setLocationsList] = useState();
  const [oldLocation, setOldLocation] = useState();
  const [locationHistory, setlocationHistory] = useState()
  // Parameter from router that allows creating specific screens for specific values
  // The value can be extracted from the path/URL this way
  const { item } = useLocalSearchParams();

  let itemsInfo = new Item()
  const locations = new Locations();

  // Loads all available free locations from the database
  function loadTheFreeLocations(){
    locations.getAllFreeLocations()
    .then((response) => {
      console.log("Free locations: ", response);
      // Free locations are saved to be shown in a modal when the user decides to change location
      setLocationsList(response.freeLocations)
    }
    )
  }

  // Loads all information about the selected item
  function loadsTheListsItems() {
    itemsInfo.getItemsListFromDatabase(item)
    .then((response) => {
      // Loads the item's complete location history
      setlocationHistory(response.itemLocationHistory)
      response.items.forEach(element => {
        setCode(element.code)
        setPartnumber(element.partnumber)
        setDescription(element.description)
        setLocation(element.location)
        setOldLocation(element.location)
      });
    })
  }

  // Prevents the user from changing to the previous location
  function oldLocationValidation(oldLocation, location){
    if(oldLocation != location){
      Alert.alert(
        `Deseja confirmar a atualização de endereço do item: ${description}?`,
        `Endereço antigo: ${oldLocation}
Novo endereço: ${location}`, 
        [ 
          { text: "Cancelar", style: 'cancel'},
          { text: "CONFIRMAR", onPress: async () => await itemsInfo.modifyLocation(code, location), style: 'destructive'}
        ]);
    } else {
      Alert.alert("Insira uma localização diferente da antiga!")
    }
  }

  // Formats the date and time when location changes were made
  function formatTheHistory(timestamps) {
    const timestampsSplited = timestamps.split("T")
    const date = timestampsSplited[0]
    const time = timestampsSplited[1].split(".")
    const formatedTimeStamps = date + " " + time[0]
    return formatedTimeStamps
  }

  useEffect (() => {
    loadTheFreeLocations();
    loadsTheListsItems();
  }, [])

  return (
    <View style={styles.container}>
      {/* Modal showing all available free locations */}
        <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType='fade'
        presentationStyle='pageSheet'>
          <View style={{flex:1, padding:20}}>
          <FlatList
          data={locationsList}
          renderItem={({item}) => (
            <Pressable onPress={() => {
              setLocation(item.location)
              setModalVisible(false)
            }}>
              <View style={styles.row}>
                <Text style={styles.label}>{item.location}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.location}
          />
        </View>
      </Modal>
      {/* Item information (read-only except location field) */}
      <View style={styles.infoContainer}>
        <BackButton />
        <Text style={styles.label}>Code</Text>
        <TextInput style={styles.input} value={code} editable={false} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Part Number</Text>
        <TextInput style={styles.input} value={partnumber} editable={false} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} editable={false} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Location</Text>
        <View style={{flexDirection:'row'}}>
          {/* Location input is automatically converted to uppercase */}
          <TextInput style={{...styles.input, width:"88%", marginRight:"2%"}} value={location} onChangeText={(text) => setLocation(text.toUpperCase())} autoCapitalize='characters'/>
          <Pressable style={{width:"10%", alignContent:'center', justifyContent:'center'}} onPress={() => setModalVisible(true)}>
            <FontAwesome name='plus-square' size={36} color={"#35B369"}/>
          </Pressable>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Image</Text>
        <TextInput style={styles.input} editable={false} />
      </View>
      <View>
        <FlatList 
        data={locationHistory}
        renderItem={({ item }) => (
          <View style={{flex:1, flexDirection:'row', marginBottom:5}}>
            <Text style={styles.locationHistory}>{item.location+":"}</Text>
            <Text style={styles.dateTime}>{formatTheHistory(item.moved_at)}</Text>
          </View>
        )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.confirmButton} onPress={() => oldLocationValidation(oldLocation, location)}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Roboto-Bold'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#35B369',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ED3A3A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: ''
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    alignItems:"center",
    justifyContent:'center'
  },
  locationHistory:{
    fontSize:16,
    marginRight:5,
    fontFamily:"Roboto-Bold",
    backgroundColor: "#fff",
    padding:5,
    width: "20%",
    justifyContent:'center',
    textAlign:'center',
    borderRadius:5,
    borderColor:"#ddd",
    borderWidth:1,
  },
  dateTime:{
    fontSize:14,
    justifyContent:'center',
    alignSelf:'center',
  }
});