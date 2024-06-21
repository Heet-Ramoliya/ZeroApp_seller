import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from '../Firebase/Config';

const Drafts = ({navigation, searchQuery}) => {
  const [userId, setUserId] = useState('');
  const [draftData, setDraftData] = useState([]);

  useEffect(() => {
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

    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, 'Seller_Draft'),
        where('UserId', '==', userId),
      );

      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          const List = [];
          querySnapshot.forEach(doc => {
            List.push({...doc.data(), id: doc.id});
          });
          setDraftData(List);
        },
        error => {
          console.error('Error listening for changes:', error);
        },
      );

      return () => unsubscribe();
    }
  }, [userId]);

  const filteredData = draftData.filter(ad =>
    ad.ModelName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DraftDetailsScreen', {item: item});
        }}>
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
              <Text style={styles.title}>{item.ModelName}</Text>
              <Text style={styles.price}>${item.Price}</Text>
              <Text style={styles.date}>Posted on: {item.postedDate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
            No Drafts items
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Drafts;
