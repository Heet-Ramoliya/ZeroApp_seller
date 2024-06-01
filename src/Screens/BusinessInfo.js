import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../Components/Button';
import Progressbar from '../Components/Progressbar';
import Textinput from '../Components/Textinput';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../Firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const BusinessInfo = ({navigation, route}) => {
  const {mode} = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const id = currentUser.uid;
          setUserId(id);
          await AsyncStorage.setItem('UserId', id);
          await AsyncStorage.setItem('sessionToken', JSON.stringify(true));
          if (mode === 'update') {
            await fetchBusinessInfo(id);
          } else {
            setLoading(false);
          }
        } else {
          console.log('No user is signed in.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  const fetchBusinessInfo = async userId => {
    try {
      const q = query(
        collection(db, 'Seller_BusinessInfo'),
        where('UserId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const businessInfo = querySnapshot.docs[0].data();
        setName(businessInfo.BusinessName);
        setContactNumber(businessInfo.ContactNumber);
        setSelectedImage(businessInfo.BusinessLogo);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching business info:', error);
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (mode === 'update') {
      try {
        const q = query(
          collection(db, 'Seller_BusinessInfo'),
          where('UserId', '==', userId),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            BusinessName: name,
            ContactNumber: contactNumber,
            BusinessLogo: selectedImage,
          });
          console.log('BusinessInfo Data updated successfully!');
          navigation.navigate('BusinessDescription', {mode: mode});
        } else {
          console.log('No matching document found');
        }
      } catch (error) {
        console.error('Error updating document:', error);
      }
    } else {
      try {
        const docData = {
          BusinessName: name,
          ContactNumber: contactNumber,
          BusinessLogo: selectedImage,
          UserId: userId,
        };
        await addDoc(collection(db, 'Seller_BusinessInfo'), docData);
        console.log('BusinessInfo Data inserted successfully!');
        navigation.navigate('BusinessDescription', {mode: mode});
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };

  const uploadLogo = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const handleImagePress = () => {
    if (!selectedImage) {
      uploadLogo();
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
        <View style={{marginTop: 25, marginHorizontal: 20}}>
          <Progressbar value={0.25} />
        </View>
        <View style={{marginHorizontal: 35}}>
          <View style={styles.text_Container}>
            <Text style={styles.heading}>
              Your business name, contact, and logo
            </Text>
            <Text style={styles.description}>
              Buyers will be able to view this information from the seller's
              profile.
            </Text>
          </View>
          <View style={styles.textinput_container}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>Business name</Text>
            </View>
            <Textinput
              placeholder="Your business/company name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>Contact number</Text>
            </View>
            <Textinput
              placeholder="Enter primary contact number"
              value={contactNumber}
              onChangeText={text => setContactNumber(text)}
            />
          </View>
          <View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.input_header}>Business logo</Text>
            </View>
            <View style={styles.imagePicker_container}>
              <TouchableOpacity
                onPress={handleImagePress}
                style={styles.imagePickerButton}>
                {selectedImage ? (
                  <>
                    <Image
                      source={{uri: selectedImage}}
                      style={styles.logoImage}
                    />
                    <TouchableOpacity
                      onPress={clearImage}
                      style={styles.closeButton}>
                      <Icon name="cross" size={20} color="#fff" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.iconContainer}>
                      <Icon
                        name="image-inverted"
                        size={50}
                        style={styles.icon}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#00a0e9'}}>Tap here</Text>
                      <Text> to upload your logo</Text>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    fontSize: 22,
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
  imagePicker_container: {
    height: 180,
    borderWidth: 0.3,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#e7e9ed',
    borderRadius: 8,
    marginBottom: 20,
  },
  icon: {
    color: '#8e98ae',
    padding: 5,
  },
  imagePickerButton: {
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BusinessInfo;
