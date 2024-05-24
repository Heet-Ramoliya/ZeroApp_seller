import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileList = ({name}) => {
  return (
    <View style={{padding: 5}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
        }}>
        <Text style={{fontSize: 18}}>{name}</Text>
        <Icon name="angle-right" size={30} color="#00a0e9" />
      </View>
    </View>
  );
};

export default ProfileList;
