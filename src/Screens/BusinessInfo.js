import React, {useState} from 'react';
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
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../Firebase/Config';

const BusinessInfo = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);

  console.log('name ==> ', name);
  console.log('contactNumber ==> ', contactNumber);
  console.log('selectedImage ==> ', selectedImage);

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

  const addBusinessInfo = async () => {
    try {
      const docData = {
        BusinessName: name,
        ContactNumber: contactNumber,
        BusinessLogo: selectedImage,
      };
      await addDoc(collection(db, 'Seller_BusinessInfo'), docData);
      console.log('BusinessInfo Data inserted successfully!');
    } catch {
      error => {
        console.error('Error ==> ', error);
      };
    }
  };

  return (
    <ScrollView>
      <View>
        {/* progress Bar */}
        <View style={{marginTop: 25, marginHorizontal: 20}}>
          <Progressbar value={0.25} />
        </View>
        <View style={{marginHorizontal: 35}}>
          {/* heading and description */}
          <View style={styles.text_Container}>
            <Text style={styles.heading}>
              Your business name, contact, and logo
            </Text>
            <Text style={styles.description}>
              Buyers will be able to view this information from the seller's
              profile.
            </Text>
          </View>
          {/* Text input component */}
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
          {/* image picker */}
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
        {/* Button component */}
        <TouchableOpacity
          onPress={() => {
            addBusinessInfo()
              .then(navigation.navigate('BusinessDescription'))
              .catch(e => {
                console.log('error ==> ', e);
              });
          }}>
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
});

export default BusinessInfo;
