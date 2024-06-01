import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Progressbar from '../Components/Progressbar';
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

const BusinessDescription = ({navigation, route}) => {
  const {mode} = route.params;
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const id = await AsyncStorage.getItem('UserId');
        if (id !== null) {
          setUserId(id);
          if (mode === 'update') {
            await fetchBusinessDescription(id);
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
        setLoading(false);
      }
    };
    getUserIdFromStorage();
  }, []);

  const fetchBusinessDescription = async userId => {
    try {
      const q = query(
        collection(db, 'Seller_BusinessDesc'),
        where('UserId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const businessDesc = querySnapshot.docs[0].data();
        setDescription(businessDesc.Description);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching business description:', error);
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const docData = {
        Description: description,
        UserId: userId,
      };

      if (mode === 'update') {
        const q = query(
          collection(db, 'Seller_BusinessDesc'),
          where('UserId', '==', userId),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, docData);
          console.log('BusinessDesc Data updated successfully!');
          navigation.navigate('BusinesssShowRoomLocation', {mode: mode});
        } else {
          console.log('No matching document found');
        }
      } else {
        await addDoc(collection(db, 'Seller_BusinessDesc'), docData);
        console.log('BusinessDesc Data inserted successfully!');
        navigation.navigate('BusinesssShowRoomLocation', {mode: mode});
      }
    } catch (error) {
      console.error('Error handling business description:', error);
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
    <View style={{flex: 1}}>
      <View style={{marginTop: 25, marginHorizontal: 20}}>
        <Progressbar value={0.5} />
      </View>
      <View style={{flex: 1, marginHorizontal: 35}}>
        <View style={styles.text_container}>
          <Text style={styles.heading}>
            Additional description about your business
          </Text>
          <Text style={styles.description}>
            Add some details about your business, which might be helpful for
            buyers. This is optional.
          </Text>
        </View>
        <View style={styles.textinput_container}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.input_header}>Business description</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <TextInput
              placeholder="Enter details"
              style={styles.input}
              numberOfLines={10}
              multiline={true}
              value={description}
              onChangeText={txt => setDescription(txt)}
            />
          </View>
        </View>
        <View
          style={{flex: 1, justifyContent: 'flex-end', marginHorizontal: -35}}>
          <TouchableOpacity onPress={checkStatus}>
            <View>
              <Button name="Continue" backgroundColor="#01a0e9" color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text_container: {
    marginTop: 35,
  },
  heading: {
    fontSize: 20,
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontWeight: '500',
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BusinessDescription;
