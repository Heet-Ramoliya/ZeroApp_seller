import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileList from '../Components/ProfileList';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../Firebase/Config';

const Profile = ({navigation}) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('sessionToken').then(() => {
        console.log('Successfully removed sessionToken!');
      });
      await AsyncStorage.removeItem('UserId').then(() => {
        console.log('Successfully removed UserId!');
      });
      navigation.replace('Login');
    } catch (error) {
      console.error('Error in removing sessionToken: ', error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const docSnap = await getDocs(collection(db, 'Seller_BusinessInfo'));
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data()});
      });
      setData(list);
    } catch (error) {
      console.error('Error fetching profile data: ', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={style.imgContainer}>
          {data.length > 0 ? (
            <Image
              source={{
                uri: data[0].BusinessLogo,
              }}
              style={style.img}
            />
          ) : (
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
              }}
              style={style.img}
            />
          )}
        </View>

        <View style={style.textContainer}>
          {data.length > 0 ? (
            <Text style={style.text1}>{data[0].BusinessName}</Text>
          ) : (
            <Text style={style.text1}>Loading...</Text>
          )}
        </View>

        <View style={{marginTop: 40}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <ProfileList name="Change Password" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BusinessProfile');
            }}>
            <ProfileList name="Business Profile" />
          </TouchableOpacity>
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
});

export default Profile;
