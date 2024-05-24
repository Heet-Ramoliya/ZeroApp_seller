import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Components/Button';

const BusinessProfile = ({navigation}) => {
  return (
    <>
      <View style={style.main_Container}>
        <View style={style.Container}>
          {/* Icon */}
          <View style={style.icon_Container}>
            <Icon name="bag-personal" size={30} color="black" />
          </View>
          {/* Headind */}
          <View style={style.text_container}>
            <Text style={style.heading}>Let's setup your business profile</Text>
          </View>
          {/* description */}
          <View style={style.text_container}>
            <Text>
              To become a verified seller on our platform, we require some
              information regarding your business.
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 50}}>
        {/* Button component */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BusinessInfo');
          }}>
          <View>
            <Button
              name="Continue"
              style={{marginHorizontal: 20}}
              backgroundColor="#01a0e9"
              color="white"
            />
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 11}}>
            You can make changes to your business info later on.
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{fontSize: 5}}>
            <Text style={{textDecorationLine: 'underline', fontSize: 11}}>
              Read our Privacy policy
            </Text>
          </TouchableOpacity>
        </View>
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

export default BusinessProfile;
