import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchComponent from '../Components/SwitchComponent';

const SystemPermission = ({navigation}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Icon name="settings" size={30} color="black" />
          </View>
          {/* Heading */}
          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              We require some system permissions
            </Text>
          </View>
          {/*first Notifications */}
          <View style={styles.notificationContainer}>
            {/* Icon */}
            <View style={styles.notificationIconContainer}>
              <Icons name="bell-ring-outline" size={30} color="#00a0e9" />
            </View>
            {/* heading and description */}
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>Allow notifications</Text>
              <Text style={styles.notificationDescription}>
                Get updates and reminders for your ads, test drives, and inbox
              </Text>
            </View>
            {/* Switch component */}
            <View style={styles.switchContainer}>
              <SwitchComponent />
            </View>
          </View>
          {/* second notification */}
          <View style={styles.notificationContainer}>
            <View style={styles.notificationIconContainer}>
              <Icons
                name="navigation-variant-outline"
                size={30}
                color="#00a0e9"
              />
            </View>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>Location services</Text>
              <Text style={styles.notificationDescription}>
                We use your location to give you a more personalised experience
              </Text>
            </View>
            <View style={styles.switchContainer}>
              <SwitchComponent />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>{/* Button component */}</View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BottomTabNavigator');
        }}>
        <View>
          <Button name="Continue" backgroundColor="#01a0e9" color="white" />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
  },
  iconContainer: {
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
  textContainer: {
    marginTop: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
  },
  notificationIconContainer: {
    marginRight: 10,
    padding: 8,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationDescription: {
    flexWrap: 'wrap',
  },
  switchContainer: {
    padding: 4,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default SystemPermission;
