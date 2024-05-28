import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dashboard from '../Screens/Dashboard';
import Inbox from '../Screens/Inbox';
import Profile from '../Screens/Profile';
import Saved from '../Screens/Saved';
import AddCars from '../Screens/AddCars';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let IconComponent;
          const iconColor = focused ? '#20abeb' : '#6e7b8d';

          if (route.name === 'Dashboard') {
            iconName = 'home-variant-outline';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Saved') {
            iconName = 'heart-outline';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'AddCars') {
            iconName = 'car';
            IconComponent = AntDesign;
          } else if (route.name === 'Inbox') {
            iconName = 'inbox-outline';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            IconComponent = AntDesign;
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({focused}) => {
          const labelColor = focused ? '#20abeb' : '#6e7b8d';
          let label;

          if (route.name === 'Dashboard') {
            label = 'Dashboard';
          } else if (route.name === 'Saved') {
            label = 'Saved';
          } else if (route.name === 'AddCars') {
            label = 'AddAd';
          } else if (route.name === 'Inbox') {
            label = 'Inbox';
          } else if (route.name === 'Profile') {
            label = 'Profile';
          }

          return <Text style={{color: labelColor, fontSize: 12}}>{label}</Text>;
        },
        tabBarActiveTintColor: '#20abeb',
        tabBarInactiveTintColor: '#6e7b8d',
        tabBarStyle: {
          paddingBottom: 10,
          height: 70,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{headerTitleAlign: 'center'}}
      />
      <Tab.Screen name="AddCars" component={AddCars} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
