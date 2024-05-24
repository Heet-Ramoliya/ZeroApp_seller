import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Separator = () => {
  return (
    <View
      style={{
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

export default Separator;
