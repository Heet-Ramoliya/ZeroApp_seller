import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const Textinput = ({placeholder, value, onChangeText}) => {
  return (
    <View style={{marginBottom: 10}}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={txt => onChangeText(txt)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontWeight: '500',
    backgroundColor: 'white',
  },
});

export default Textinput;
