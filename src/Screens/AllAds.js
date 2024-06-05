import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
} from 'firebase/firestore';
import {db} from '../Firebase/Config';
import Icons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const AllAds = ({navigation, searchQuery}) => {
  const [allData, setAllData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    let unsubscribeAds;
    let unsubscribeFavorites;

    if (userId) {
      unsubscribeAds = getData();
      unsubscribeFavorites = getFavorites();
    }

    return () => {
      if (unsubscribeAds) unsubscribeAds();
      if (unsubscribeFavorites) unsubscribeFavorites();
    };
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserId = async () => {
        const id = await AsyncStorage.getItem('UserId');
        if (id !== null && id !== userId) {
          setUserId(id);
        }
      };
      fetchUserId();
    }, [userId]),
  );

  const getUserIdFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('UserId');
      if (id !== null) {
        setUserId(id);
      }
    } catch (error) {
      console.error('Error retrieving userId from AsyncStorage:', error);
    }
  };

  const getData = () => {
    const q = collection(db, 'CreateAD');
    return onSnapshot(
      q,
      snapshot => {
        let AdList = [];
        snapshot.forEach(doc => {
          AdList.push({...doc.data(), id: doc.id});
        });
        setAllData(AdList);
        setLoading(false);
      },
      error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      },
    );
  };

  const getFavorites = () => {
    if (!userId) return;
    const q = query(
      collection(db, 'Favorites_Seller'),
      where('UserId', '==', userId),
    );
    return onSnapshot(
      q,
      snapshot => {
        let favList = [];
        snapshot.forEach(doc => {
          favList.push(doc.data().id);
        });
        setFavorites(favList);
      },
      error => {
        console.error('Error fetching favorites:', error);
      },
    );
  };

  const addFavourite = async item => {
    await addDoc(collection(db, 'Favorites_Seller'), {
      ...item,
      UserId: userId,
    }).then(() => {
      console.log('Successfully added data into favorite collection');
    });
  };

  const removeFavourite = async id => {
    const q = query(
      collection(db, 'Favorites_Seller'),
      where('UserId', '==', userId),
      where('id', '==', id),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async docSnap => {
      await deleteDoc(doc(db, 'Favorites_Seller', docSnap.id)).then(() => {
        console.log('Successfully deleted data from favorite collection');
      });
    });
  };

  const toggleFavourite = async item => {
    if (favorites.includes(item.id)) {
      await removeFavourite(item.id);
    } else {
      await addFavourite(item);
    }
  };

  const filteredData = allData.filter(ad =>
    ad.Title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.card}>
        <View style={styles.mainContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{uri: item.ModelImage}}
              style={styles.img}
              resizeMode={'contain'}
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
                <Text style={{color: 'white', padding: 4, fontSize: 12}}>
                  Active
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#00a0e9',
                  borderRadius: 10,
                  marginRight: 5,
                }}>
                <Text style={{color: 'white', padding: 4, fontSize: 12}}>
                  Promoted
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#00a0e9',
                  borderRadius: 10,
                  marginRight: 5,
                }}>
                <Text style={{color: 'white', padding: 4, fontSize: 12}}>
                  Draft
                </Text>
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
            <TouchableOpacity onPress={() => toggleFavourite(item)}>
              <Icon
                name={isFavorite ? 'favorite' : 'favorite-outline'}
                size={24}
                color={isFavorite ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00a0e9" style={styles.loader} />
      ) : filteredData.length === 0 ? (
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
          data={filteredData}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllAds;
