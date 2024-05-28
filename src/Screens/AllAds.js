import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../Firebase/Config';
import Icons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AllAds = ({navigation}) => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'CreateAD'));
      const Adlist = querySnapshot.docs.map(doc => ({...doc.data()}));
      setAllData(Adlist);
    } catch (e) {
      console.error('Error fetching documents: ', e);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.mainContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item.ModelImage}}
            style={styles.img}
            resizeMode={'stretch'}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.price}>${item.Price}</Text>
          <Text style={styles.date}>Posted on: {item.postedDate}</Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#00a0e9',
                borderRadius: 10,
                marginRight: 5,
              }}>
              <Text style={{color: 'white', padding: 4}}>Active</Text>
            </View>
            <View
              style={{
                backgroundColor: '#00a0e9',
                borderRadius: 10,
                marginRight: 5,
              }}>
              <Text style={{color: 'white', padding: 4}}>Promoted</Text>
            </View>
            <View style={{justifyContent: 'center', marginRight: 5}}>
              <AntDesign name="calendar" size={20} color="#00a0e9" />
            </View>
            <View style={{justifyContent: 'center', marginRight: 5}}>
              <Icons name="message-square" size={20} color="#00a0e9" />
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Icon name="favorite-border" size={24} color="black" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {allData.length === 0 ? (
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
            <View style={styles.button}>
              <Icon name="add" size={30} color="white" />
              <Text style={styles.buttonText}>Create new ad</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={allData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  button: {
    flexDirection: 'row',
    backgroundColor: '#20abeb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    paddingLeft: 8,
  },
  card: {
    borderColor: 'white',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mainContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  imgContainer: {
    marginRight: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
  },
  price: {
    padding: 2,
    color: '#333',
    fontWeight: 'bold',
  },
  date: {
    padding: 2,
    color: '#6e7b8d',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default AllAds;
