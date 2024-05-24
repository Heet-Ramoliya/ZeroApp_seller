import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Data} from '../Constant/CarData';

const CarListScroll = () => {
  const renderItem = ({item}) => (
    <View key={item.id} style={styles.container}>
      <Text style={styles.additionalText}>New</Text>
      <Image
        source={{uri: item.Image}}
        style={styles.img}
        resizeMode="stretch"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.carName}>{item.name}</Text>
            <View style={styles.infoContainer}>
              <Text>{item.Country}</Text>
              <Text style={styles.separator}>.</Text>
              <Text>{item.distance} miles</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="heart" size={25} color="black" />
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <Text>@ ${item.emi}/mo*</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={Data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#e6e5e5',
  },
  img: {
    flex: 1,
  },
  additionalText: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#00a0e9',
    padding: 2,
    borderRadius: 5,
    zIndex: 1,
    color: 'white',
  },
  detailsContainer: {
    flex: 2,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  carName: {
    color: 'black',
    fontWeight: '700',
    fontSize: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 5,
  },
  iconContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  price: {
    color: '#00a0e9',
  },
  listContentContainer: {
    flexGrow: 1,
  },
});

export default CarListScroll;
