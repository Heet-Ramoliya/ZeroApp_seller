import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../Firebase/Config';

const CarListScroll = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const docSnap = await getDocs(collection(db, 'Favorites_Seller'));
      let FavoritesList = [];
      docSnap.forEach(doc => {
        FavoritesList.push({...doc.data()});
      });
      setFavorites(FavoritesList);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const removeFavourite = async id => {
    const q = query(collection(db, 'Favorites_Seller'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async docSnap => {
      await deleteDoc(doc(db, 'Favorites_Seller', docSnap.id)).then(() => {
        console.log('Successfully deleted data from favorite collection');
        setFavorites(favorites.filter(favId => favId !== id));
      });
    });
  };

  const renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.container}>
        <Image
          source={{uri: item.ModelImage}}
          style={styles.img}
          resizeMode="stretch"
        />
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.carName}>{item.Title}</Text>
              <View style={styles.infoContainer}>
                <Text>{item.RegistationCenter}</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  removeFavourite(item.id);
                }}>
                <Icon name="heart" size={25} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.Price}</Text>
          </View>
        </View>
      </View>
    );
  };

  const keyExtractor = item => item.id.toString();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00a0e9" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#e6e5e5',
    backgroundColor: 'white',
  },
  img: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 10,
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
    marginTop: 5,
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
    fontWeight: '700',
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default CarListScroll;
