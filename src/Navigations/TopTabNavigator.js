import React, {useState} from 'react';
import {Dimensions, TextInput} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Active from '../Screens/Active';
import AllAds from '../Screens/AllAds';
import Drafts from '../Screens/Drafts';
import Inactive from '../Screens/Inactive';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome6';

const {height} = Dimensions.get('window');

const TopTab = createMaterialTopTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ImageBackground
      //   source={{
      //     uri: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?cs=srgb&dl=pexels-albinberlin-919073.jpg&fm=jpg',
      //   }}
      source={require('../../utils/Images/WelcomeScreen.png')}
      style={[styles.container, {height: height * 0.3}]}
      imageStyle={styles.imageStyle}>
      {/* Snowflake Icon */}
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 5,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Icons name="snowflake" color="white" size={20} />
        </View>
        <View style={{justifyContent: 'center', paddingLeft: 10}}>
          <Text style={{color: 'white', fontSize: 20}}>Zero</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={30} color="#20abeb" />
          <TextInput
            placeholder="Search for ads"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Icon name="filter-outline" size={30} color="#20abeb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Tab Navigation */}
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}>
              <View
                style={{
                  backgroundColor: isFocused ? 'white' : 'transparent',
                  padding: 8,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 10,
                }}>
                <Text
                  style={{
                    color: isFocused ? 'black' : 'white',
                    fontWeight: '500',
                  }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  searchBarContainer: {
    marginTop: height * 0.05,
    marginHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: height * 0.05,
  },
  tabItem: {
    alignItems: 'center',
  },
});

export const TopTabNavigator = () => {
  return (
    <TopTab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <TopTab.Screen
        name="AllAds"
        component={AllAds}
        options={{title: 'All Ads (0)'}}
      />
      <TopTab.Screen
        name="Active"
        component={Active}
        options={{title: 'Active (0)'}}
      />
      <TopTab.Screen
        name="Drafts"
        component={Drafts}
        options={{title: 'Drafts (0)'}}
      />
      <TopTab.Screen
        name="Inactive"
        component={Inactive}
        options={{title: 'Inactive (0)'}}
      />
    </TopTab.Navigator>
  );
};



