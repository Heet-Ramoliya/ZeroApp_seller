import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({name, backgroundColor, color}) => {
  return (
    <View>
      <View style={[styles.container, {backgroundColor}]}>
        <Text style={[styles.txt, {color}]}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 15,
    borderRadius: 100,
  },
  txt: {
    textAlign: 'center',
  },
});

export default Button;
