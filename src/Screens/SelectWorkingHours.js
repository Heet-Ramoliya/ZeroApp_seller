import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Progressbar from '../Components/Progressbar';
import SelectTime from '../Components/SelectTime';
import Button from '../Components/Button';

const SelectWorkingHours = ({navigation}) => {
  return (
    <ScrollView>
      <View>
        {/* progress Bar */}
        <View style={{marginTop: 25, marginHorizontal: 20}}>
          <Progressbar value={1} />
        </View>
        <View style={{marginHorizontal: 35}}>
          {/* heading and description */}
          <View style={styles.text_Container}>
            <Text style={styles.heading}>Select working hours</Text>
            <Text style={styles.description}>
              Set up weekly working schedule for your business.
            </Text>
          </View>
          {/* Select Time component */}
          <View style={{marginTop: 15}}>
            <SelectTime dayName="Sunday" />
            <SelectTime dayName="Monday" />
            <SelectTime dayName="Tuesday" />
            <SelectTime dayName="Wednesday" />
            <SelectTime dayName="Thursday" />
            <SelectTime dayName="Friday" />
            <SelectTime dayName="Saturday" />
          </View>
        </View>
      </View>
      {/* Button Component */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AllDone');
        }}>
        <View style={{marginTop: 10, marginBottom: 10}}>
          <View>
            <Button name="Continue" backgroundColor="#01a0e9" color="white" />
          </View>
        </View>
      </TouchableOpacity>
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
});

export default SelectWorkingHours;
