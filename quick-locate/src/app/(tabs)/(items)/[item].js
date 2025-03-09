import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLocalDatabase } from '../../../../backend/database/local-database-CRUD';
import { useEffect, useState } from 'react';

export default function itemDetails() {
  const [code, setCode] = useState();
  const [partnumber, setPartnumber] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const itemInformationFromDatabase = useLocalDatabase();
  const { item } = useLocalSearchParams();
  
  useEffect (() => {
    itemInformationFromDatabase.getItemInformationByCode(item)
    .then((response) => {setCode(response[0].code), setPartnumber(response[0].partnumber), setDescription(response[0].description), setLocation(response[0].item_location)})
  }, [])

  return (
    <View style={styles.container}>
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
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Image</Text>
        <TextInput style={styles.input} editable={false} />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.confirmButton} onPress={() => itemInformationFromDatabase.modifyLocation(code, location)}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
        <Pressable style={styles.cancelButton}>
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
});
