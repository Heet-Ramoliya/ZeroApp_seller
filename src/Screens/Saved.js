import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconS from 'react-native-vector-icons/Octicons';
import {
  collection,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import {db} from '../Firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {carDatas} from '../Constant/newAd';
import Button from '../Components/Button';

const Saved = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [originalFavorites, setOriginalFavorites] = useState([]);

  useEffect(() => {
    if (searchQuery === '') {
      setFavorites(originalFavorites);
    } else {
      const filteredData = originalFavorites.filter(item => {
        const title = item.Title.toLowerCase();
        const searchText = searchQuery.toLowerCase();
        return title.includes(searchText);
      });
      setFavorites(filteredData);
    }
  }, [searchQuery]);

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = () => {
    if (userId) {
      const q = query(
        collection(db, 'Favorites_Seller'),
        where('UserId', '==', userId),
      );
      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          let FavoritesList = [];
          querySnapshot.forEach(doc => {
            FavoritesList.push({...doc.data(), id: doc.id});
          });
          setFavorites(FavoritesList);
          setOriginalFavorites(FavoritesList);
          setLoading(false);
        },
        error => {
          setError(error.message);
          setLoading(false);
        },
      );
      return () => unsubscribe();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserIdFromStorage();
    }, []),
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

  const removeFavourite = async id => {
    try {
      await deleteDoc(doc(db, 'Favorites_Seller', id));
      console.log('Successfully deleted data from favorite collection');
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
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
                <Icons name="heart" size={25} color="red" />
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

  const latestFirst = () => {
    setSelectedFilter('latestFirst');
    const sortedFavorites = [...originalFavorites].sort(
      (a, b) => b.Year - a.Year,
    );
    setFavorites(sortedFavorites);
    setModalVisible(false);
  };

  const oldestFirst = () => {
    setSelectedFilter('oldestFirst');
    const sortedFavorites = [...originalFavorites].sort(
      (a, b) => a.Year - b.Year,
    );
    setFavorites(sortedFavorites);
    setModalVisible(false);
  };

  const HighToLow = () => {
    setSelectedFilter('HighToLow');
    const sortedFavorites = originalFavorites
      .slice()
      .sort(
        (a, b) =>
          parseFloat(b.Price.replace(/,/g, '')) -
          parseFloat(a.Price.replace(/,/g, '')),
      );
    setFavorites(sortedFavorites);
    setModalVisible(false);
  };

  const LowToHigh = () => {
    setSelectedFilter('LowToHigh');
    const sortedFavorites = originalFavorites
      .slice()
      .sort(
        (a, b) =>
          parseFloat(a.Price.replace(/,/g, '')) -
          parseFloat(b.Price.replace(/,/g, '')),
      );
    setFavorites(sortedFavorites);
    setModalVisible(false);
  };

  const getIconName = filter => {
    return selectedFilter === filter ? 'circle-slice-8' : 'circle-outline';
  };

  const removeDuplicateCars = carList => {
    const uniqueCars = [];
    const uniqueKeys = new Set();

    carList.forEach(car => {
      if (!uniqueKeys.has(car.logo)) {
        uniqueCars.push(car);
        uniqueKeys.add(car.logo);
      }
    });

    return uniqueCars;
  };

  const handleBrandSelection = brand => {
    const isSelected = selectedBrands.includes(brand);
    if (isSelected) {
      setSelectedBrands(prevBrands =>
        prevBrands.filter(item => item !== brand),
      );
    } else {
      setSelectedBrands(prevBrands => [...prevBrands, brand]);
    }
  };

  const handleConditionSelection = condition => {
    setSelectedCondition(condition);
  };

  const renderBrand = ({item}) => {
    isSelected = selectedBrands.includes(item.brand);
    return (
      <TouchableOpacity
        onPress={() => handleBrandSelection(item.brand)}
        style={{
          backgroundColor: isSelected ? '#20abeb' : 'white',
          padding: 8,
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginRight: 10,
          borderRadius: 100,
          elevation: 4,
          marginHorizontal: 5,
          marginBottom: 10,
        }}>
        <Image source={{uri: item.logo}} style={{height: 50, width: 50}} />
      </TouchableOpacity>
    );
  };

  const applyFilters = () => {
    let filteredFavorites = originalFavorites;

    if (selectedBrands.length > 0) {
      filteredFavorites = filteredFavorites.filter(car =>
        selectedBrands.includes(car.Brand),
      );
    }

    if (selectedCondition) {
      filteredFavorites = filteredFavorites.filter(
        car => car.Carcondition === selectedCondition,
      );
    }

    setFavorites(filteredFavorites);
    setFilterModal(false);
  };

  const clearFilter = () => {
    setFilterModal(false);
    setFavorites(originalFavorites);
    setSelectedBrands([]);
    setSelectedCondition('');
    setSearchQuery('');
  };

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
            onChangeText={text => {
              setSearchQuery(text);
            }}
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
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => {
              setFilterModal(true);
            }}>
            <Icon name="filter-outline" size={30} color="#20abeb" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => {
              setModalVisible(true);
            }}>
            <IconS name="sort-desc" size={30} color="#20abeb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Total saved list */}
      <View style={{marginTop: 15, marginBottom: 15}}>
        <Text style={{color: 'black', fontWeight: '500'}}>
          {favorites.length} Saved Listing
        </Text>
      </View>

      {/* Saved Car List */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
            No saved items
          </Text>
        </View>
      )}

      {/* Sort Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 17}}>Sort by</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: 'lightgrey',
                  borderRadius: 50,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#20abeb',
                  }}>
                  x
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={latestFirst}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginTop: 10,
                }}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 15}}>
                    Latest first
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Icons
                    name={getIconName('latestFirst')}
                    size={20}
                    color="#02ac98"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={oldestFirst}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginTop: 10,
                }}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 15}}>
                    Oldest first
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Icons
                    name={getIconName('oldestFirst')}
                    size={20}
                    color="#02ac98"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={HighToLow}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginTop: 10,
                }}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 15}}>
                    Price - High to Low
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Icons
                    name={getIconName('HighToLow')}
                    size={20}
                    color="#02ac98"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={LowToHigh}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginTop: 10,
                }}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 15}}>
                    Price - Low to High
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Icons
                    name={getIconName('LowToHigh')}
                    size={20}
                    color="#02ac98"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={filterModal}
        onRequestClose={() => {
          setFilterModal(!filterModal);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <View style={{marginHorizontal: 15, marginVertical: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                  Filters
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setFilterModal(!filterModal);
                  }}
                  style={{
                    justifyContent: 'center',
                    backgroundColor: 'lightgrey',
                    borderRadius: 100,
                  }}>
                  <Icons name="close" size={25} />
                </TouchableOpacity>
              </View>

              {/* car brand */}
              <Text style={{marginTop: 10, color: 'black', fontSize: 16}}>
                Popular brands
              </Text>
              <View>
                <View style={{marginTop: 10}}>
                  <FlatList
                    data={removeDuplicateCars(carDatas)}
                    renderItem={renderBrand}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                {/* Car condition */}
                <Text style={{marginTop: 10, color: 'black', fontSize: 16}}>
                  Condition
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleConditionSelection('New Car')}
                    style={{
                      backgroundColor:
                        selectedCondition === 'New Car' ? '#20abeb' : 'white',
                      paddingHorizontal: 35,
                      paddingVertical: 5,
                      borderRadius: 10,
                      alignItems: 'center',
                      elevation: 4,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <Image
                        source={require('../../utils/Images/AllAd.jpg')}
                        style={{height: 50, width: 50, marginRight: 10}}
                        resizeMode={'contain'}
                      />
                      <View style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 15, color: 'black'}}>New</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleConditionSelection('Old Car')}
                    style={{
                      backgroundColor:
                        selectedCondition === 'Old Car' ? '#20abeb' : 'white',
                      paddingHorizontal: 35,
                      paddingVertical: 5,
                      borderRadius: 10,
                      elevation: 4,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <Image
                        source={require('../../utils/Images/old.png')}
                        style={{height: 50, width: 50, marginRight: 10}}
                        resizeMode={'contain'}
                      />
                      <View style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 15, color: 'black'}}>Old</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={clearFilter}>
                    <Button
                      name="Clear all"
                      color="#20abeb"
                      backgroundColor="lightgrey"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={applyFilters}>
                    <Button
                      name="Listings found"
                      color="white"
                      backgroundColor="#20abeb"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#00a0e9',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default Saved;
