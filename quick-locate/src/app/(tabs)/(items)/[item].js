import { StyleSheet, Text, TextInput, View, Pressable, Modal, FlatList} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { useLocalDatabase } from '../../../../backend/database/local-database-CRUD';
import { useEffect, useState } from 'react';
import {FontAwesome} from "@expo/vector-icons"
import { Item } from '../../../../backend/class/item';

export default function itemDetails() {
  const [code, setCode] = useState();
  const [partnumber, setPartnumber] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationsList, setLocationsList] = useState();
  // const localDatabase = useLocalDatabase();
  const { item } = useLocalSearchParams();

  let itemsInfo = new Item()

  useEffect (() => {
    // localDatabase.getItemInformationByCode(item)
    // .then((response) => {
    //   setCode(response[0].code), 
    //   setPartnumber(response[0].partnumber), 
    //   setDescription(response[0].description), 
    //   setLocation(response[0].location)})
    // localDatabase.getAllFreeLocations()
    // .then((response) => {
    //   // console.log("Free locations: ", response);
    //   setLocationsList(response)
    // }
    // )
 
    itemsInfo.getItemsListFromDatabase(item)
    .then((response) => {
      response.items.forEach(element => {
        setCode(element.code)
        setPartnumber(element.partnumber)
        setDescription(element.description)
        setLocation(element.location)
      });
    })
  }, [])

  return (
    <View style={styles.container}>
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
      <View style={styles.infoContainer}>
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
          <TextInput style={{...styles.input, width:"88%", marginRight:"2%"}} value={location} onChangeText={setLocation} />
          <Pressable style={{width:"10%", alignContent:'center', justifyContent:'center'}} onPress={() => setModalVisible(true)}>
            <FontAwesome name='plus-square' size={36} color={"#35B369"}/>
          </Pressable>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Image</Text>
        <TextInput style={styles.input} editable={false} />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.confirmButton} onPress={() => localDatabase.modifyLocation(code, location)}>
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
});
