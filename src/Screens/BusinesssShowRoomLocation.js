import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Progressbar from '../Components/Progressbar';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../Firebase/Config';

const BusinesssShowRoomLocation = ({navigation, route}) => {
  const {mode} = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [contactNumbers, setContactNumbers] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  const getUserIdFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('UserId');
      if (id !== null) {
        setUserId(id);
        if (mode === 'update') {
          await fetchShowRoomLocation(id);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error retrieving userId from AsyncStorage:', error);
      setLoading(false);
    }
  };

  const fetchShowRoomLocation = async userId => {
    try {
      const q = query(
        collection(db, 'Seller_BusinessShowRoomLocation'),
        where('UserId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const showroomData = querySnapshot.docs[0].data();
        setName(showroomData.Name);
        setAddress(showroomData.Address);
        setCity(showroomData.City);
        setContactNumbers(showroomData.ContactNumber);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching showroom location:', error);
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const docData = {
        Name: name,
        Address: address,
        City: city,
        ContactNumber: contactNumbers,
        UserId: userId,
      };

      if (mode === 'update') {
        const q = query(
          collection(db, 'Seller_BusinessShowRoomLocation'),
          where('UserId', '==', userId),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, docData);
          console.log('BusinessShowRoomLocation Data updated successfully!');
          navigation.navigate('SelectWorkingHours', {mode: mode});
        } else {
          console.log('No matching document found');
        }
      } else {
        await addDoc(
          collection(db, 'Seller_BusinessShowRoomLocation'),
          docData,
        );
        console.log('BusinessShowRoomLocation Data inserted successfully!');
        navigation.navigate('SelectWorkingHours', {mode: mode});
      }
    } catch (error) {
      console.error('Error handling showroom location:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        {/* Progress Bar */}
        <View style={{marginTop: 25, marginHorizontal: 20}}>
          <Progressbar value={0.75} />
        </View>
        <View style={{marginHorizontal: 35}}>
          {/* Heading and Description */}
          <View style={styles.text_Container}>
            <Text style={styles.heading}>Add your showroom location</Text>
            <Text style={styles.description}>
              You'll be able to add more showrooms from your business profile
              settings.
            </Text>
          </View>
          {/* Text Input Components */}
          <View style={styles.textinput_container}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>Showroom name</Text>
            </View>
            <Textinput
              placeholder="Your showroom name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>Address</Text>
            </View>
            <Textinput
              placeholder="Enter address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>City</Text>
            </View>
            <Textinput
              placeholder="Enter city"
              value={city}
              onChangeText={text => setCity(text)}
            />
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>Contact number</Text>
            </View>
            <Textinput
              placeholder="Enter contact number"
              value={contactNumbers}
              onChangeText={text => setContactNumbers(text)}
            />
          </View>
        </View>
        {/* Button Component */}
        <TouchableOpacity onPress={checkStatus}>
          <View style={{marginTop: 25}}>
            <View>
              <Button name="Continue" backgroundColor="#01a0e9" color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text_Container: {
    marginTop: 35,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
  },
  description: {
    textAlign: 'justify',
  },
  textinput_container: {
    marginTop: 30,
  },
  input_header: {
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BusinesssShowRoomLocation;
