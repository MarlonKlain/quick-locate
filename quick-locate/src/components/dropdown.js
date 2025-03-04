import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';


const data = [
    { label: 'Código', value: 'Código' },
    { label: 'Partnumber', value: 'Partnumber' },
    { label: 'Descrição', value: 'Descrição' },
    { label: 'Localização', value: 'Localização' },
  ];

  const DropdownComponent = ({filters, label, onSendValue}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
      <View style={styles.container}> 
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          itemTextStyle={styles.itemTextStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={filters}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? label : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              onSendValue(item.value)
          }}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    itemTextStyle: {
        fontFamily: "Roboto-Bold",
        fontSize: 14
    },
    dropdown: {
        backgroundColor:"#F5B236",
        height: 30,
        width:120,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginHorizontal:20,
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    icon: {
        marginRight: 5,

    },
    label: {
        backgroundColor: '#F5B236',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
    },
    placeholderStyle: {
        fontSize: 12,
        textAlign:"center",
        color:"white",
        fontFamily: "Roboto-Bold",
    },
    selectedTextStyle: {
        fontSize: 12,
        color:"white",
        fontFamily: "Roboto-Bold",

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
    },
    
  });