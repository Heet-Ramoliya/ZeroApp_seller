import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllDone = ({navigation}) => {
  return (
    <>
      <View style={style.main_Container}>
        <View style={style.Container}>
          {/* Image */}
          <View style={style.icon_Container}>
            <Image
              source={require('../../utils/Images/check.png')}
              style={{height: 24, width: 24}}
            />
          </View>
          {/* Headind */}
          <View style={style.text_container}>
            <Text style={style.heading}>All Done!</Text>
          </View>
          {/* description */}
          <View style={style.text_container}>
            <Text>
              Thank you for providing all the information. We'll contact you
              soon to complete the verification.
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 20}}>
        {/* Button component */}
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('sessionToken', JSON.stringify(true));
            navigation.navigate('SystemPermission');
          }}>
          <View>
            <Button name="Confirm" backgroundColor="#01a0e9" color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  main_Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    marginHorizontal: 20,
  },
  icon_Container: {
    backgroundColor: 'white',
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    color: 'black',
  },
  text_container: {
    marginTop: 10,
  },
});
export default AllDone;
