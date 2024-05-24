import React from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllAds = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Image
          source={{
            uri: 'https://png.pngtree.com/thumb_back/fw800/background/20230718/pngtree-d-render-of-isolated-white-background-premium-electric-sports-sedan-car-image_3904468.jpg',
          }}
          style={styles.carImage}
        />
        <Text style={styles.title}>Create first ad</Text>
        <Text style={styles.subtitle}>
          Start selling your vehicles with your very first car ad
        </Text>
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
