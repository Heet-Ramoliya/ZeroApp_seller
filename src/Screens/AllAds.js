import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllAds = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Image
          source={require('../../utils/Images/AllAd.jpg')}
          style={styles.carImage}
        />
        <Text style={styles.title}>Create first ad</Text>
        <Text style={styles.subtitle}>
          Start selling your vehicles with your very first car ad
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('AddCars')}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#20abeb',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 50,
            }}>
            <Icon name="add" size={30} color="white" />
            <View style={{justifyContent: 'center', paddingRight: 8}}>
              <Text style={{color: 'white'}}>Create new ad</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainContent: {
    alignItems: 'center',
    padding: 20,
  },
  carImage: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#6e7b8d',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AllAds;
