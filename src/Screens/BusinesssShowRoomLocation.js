import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Progressbar from '../Components/Progressbar';
import Textinput from '../Components/Textinput';
import {useState} from 'react';
import Button from '../Components/Button';

const BusinesssShowRoomLocation = ({navigation}) => {
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [contactNumbers, setContactNumbers] = useState(null);
  return (
    <ScrollView>
      <View>
        {/* progress Bar */}
        <View style={{marginTop: 25, marginHorizontal: 20}}>
          <Progressbar value={0.75} />
        </View>
        <View style={{marginHorizontal: 35}}>
          {/* heading and description */}
          <View style={styles.text_Container}>
            <Text style={styles.heading}>Add your showroom location</Text>
            <Text style={styles.description}>
              You'll be able to add more showrooms from your business profile
              settings.
            </Text>
          </View>
          {/* Text input component */}
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
              <Text style={styles.input_header}>Address</Text>
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
        {/* Button component */}
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectWorkingHours')}>
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
});

export default BusinesssShowRoomLocation;
