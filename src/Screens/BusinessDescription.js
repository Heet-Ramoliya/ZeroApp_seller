import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Progressbar from '../Components/Progressbar';
import Button from '../Components/Button';

const BusinessDescription = ({navigation}) => {
  const [description, setDescription] = useState(null);
  return (
    <View style={{flex: 1}}>
      {/* Progress Bar */}
      <View style={{marginTop: 25, marginHorizontal: 20}}>
        <Progressbar value={0.5} />
      </View>
      <View style={{flex: 1, marginHorizontal: 35}}>
        {/* heading and description */}
        <View style={styles.text_container}>
          <Text style={styles.heading}>
            Additional description about your business
          </Text>
          <Text style={styles.description}>
            Add some details about your business, which might be helpful for
            buyers. This is optional.
          </Text>
        </View>
        {/* Business description */}
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
        {/* Button component */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginHorizontal: -35,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BusinesssShowRoomLocation');
            }}>
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
});

export default BusinessDescription;
