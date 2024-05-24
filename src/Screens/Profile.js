import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ProfileList from '../Components/ProfileList';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('sessionToken');
      console.log('Successfully removed sessionToken!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error in removing sessionToken: ', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={style.imgContainer}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/1200x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg',
            }}
            style={style.img}
          />
        </View>

        <View style={style.textContainer}>
          <Text style={style.text1}>Abdul Hussein</Text>
          <Text style={style.text2}>+964 770 888 5777</Text>
        </View>

        <View style={{marginTop: 40}}>
          <ProfileList name="Change Password" />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <View>
          <Button
            name="Logout"
            style={{marginVertical: 20}}
            backgroundColor="#2596be"
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  img: {
    height: 85,
    width: 85,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  textContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  text1: {
    color: 'black',
    padding: 2,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
  text2: {
    padding: 2,
    textAlign: 'center',
  },
});

export default Profile;
