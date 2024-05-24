import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconS from 'react-native-vector-icons/Octicons';
import CarListScroll from '../Components/CarListScroll';

const Saved = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{marginHorizontal: 10, flex: 1}}>
      {/* SearchBar */}
      <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 8,
            alignItems: 'center',
            flex: 1,
            borderWidth: 0.2,
            borderColor: '#ddd',
            elevation: 3,
          }}>
          <Icon name="search" size={25} color="#20abeb" />
          <TextInput
            placeholder="Search"
            style={{
              flex: 1,
              marginLeft: 10,
              height: 40,
            }}
            value={searchQuery}
            onChangeText={txt => setSearchQuery(txt)}
          />
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Icons name="microphone-outline" size={25} color="#20abeb" />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Icon name="camera-outline" size={25} color="#20abeb" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Icon name="filter-outline" size={30} color="#20abeb" />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <IconS name="sort-desc" size={30} color="#20abeb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Total saved list */}
      <View style={{marginTop: 15, marginBottom: 15}}>
        <Text style={{color: 'black', fontWeight: '500'}}>
          98 Saved Listing
        </Text>
      </View>

      {/* Saved Car List */}
      <ScrollView style={{paddingBottom: 20}}>
        <CarListScroll />
      </ScrollView>
    </View>
  );
};

export default Saved;
