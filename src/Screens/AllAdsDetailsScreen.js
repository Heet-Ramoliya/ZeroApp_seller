import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {carDatas} from '../Constant/newAd';
import ImagePicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/Entypo';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import {db} from '../Firebase/Config';
import {addDoc, collection} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllAdsDetailsScreen = ({route}) => {
  const {item} = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(item.Brand);
  const [selectedYear, setSelectedYear] = useState(item.Year);
  const [selectedModelCars, setSelectedModelCars] = useState([]);
  const [selectedModel, setSelectedModel] = useState({
    model: item.ModelName,
    model_image: item.ModelImage,
    variants: item.Variant,
    Colors: item.Color,
    RegistationCenter: item.RegistationCenter,
  });
  const [selectedVariant, setSelectedVariant] = useState(item.Variant);
  const [selectedCondition, setSelectedCondition] = useState(item.Carcondition);
  const [selectedColor, setSelectedColor] = useState(item.Color);
  const [selectedCenter, setSelectedCenter] = useState(item.RegistationCenter);
  const [selectedImage, setSelectedImage] = useState(item.CarPhotos || []);
  const [title, setTitle] = useState(item.Title);
  const [price, setPrice] = useState(item.Price);
  const [userId, setUserId] = useState('');

  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const groupedCars = carDatas.reduce((acc, car) => {
    if (!acc[car.brand]) {
      acc[car.brand] = [];
    }
    acc[car.brand].push(car);
    return acc;
  }, {});

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

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

  useEffect(() => {
    if (selectedBrand) {
      const brandCars = groupedCars[selectedBrand];
      setSelectedModelCars(brandCars.filter(car => car.year === selectedYear));
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand && selectedYear !== null) {
      const brandCars = groupedCars[selectedBrand];
      setSelectedModelCars(brandCars.filter(car => car.year === selectedYear));
    }
  }, [selectedYear]);

  const renderBrand = brand => {
    return (
      <View
        key={brand}
        style={[
          styles.brandContainer,
          {
            backgroundColor:
              selectedBrand === brand ? '#20abeb' : 'transparent',
          },
        ]}>
        <Image
          source={{uri: groupedCars[brand][0].logo}}
          style={styles.brandImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderYear = ({item}) => {
    const isSelected = selectedYear === item;
    return (
      <View
        style={[
          styles.yearContainer,
          {
            backgroundColor: isSelected ? '#20abeb' : 'white',
          },
        ]}>
        <Text
          style={[styles.yearText, {color: isSelected ? 'white' : 'black'}]}>
          {item}
        </Text>
      </View>
    );
  };

  const renderModel = ({item}) => {
    const isSelected =
      selectedModel &&
      selectedModel.model === item.model &&
      selectedModel.model_image === item.model_image;
    return (
      <View
        style={[
          styles.modelContainer,
          {
            backgroundColor: isSelected ? '#20abeb' : 'white',
          },
        ]}>
        <Image
          source={{uri: item.model_image}}
          style={{height: 50, width: 50}}
          resizeMode={'contain'}
        />
        <Text
          style={[styles.modelText, {color: isSelected ? 'white' : 'black'}]}>
          {item.model}
        </Text>
      </View>
    );
  };

  const renderVariant = ({item}) => {
    const isSelected = selectedVariant === item;
    console.log(isSelected);
    return (
      <View
        style={[
          styles.variantContainer,
          {
            backgroundColor: isSelected ? '#20abeb' : 'white',
          },
        ]}>
        <Text
          style={[styles.variantText, {color: isSelected ? 'white' : 'black'}]}>
          {item}
        </Text>
      </View>
    );
  };

  const renderCondition = condition => {
    const isSelected = selectedCondition === condition;
    return (
      <View
        style={[
          styles.conditionContainer,
          {
            backgroundColor: isSelected ? '#20abeb' : 'white',
          },
        ]}>
        <Image
          source={require('../../utils/Images/AllAd.jpg')}
          style={styles.conditionImage}
          resizeMode={'contain'}
        />
        <View style={{justifyContent: 'center'}}>
          <Text
            style={[
              styles.conditionText,
              {color: isSelected ? 'white' : 'black'},
            ]}>
            {condition}
          </Text>
        </View>
      </View>
    );
  };

  const renderColor = ({item}) => {
    const isSelected = selectedColor === item;
    return (
      <TouchableOpacity
        onPress={() => setSelectedColor(isSelected ? null : item)}
        style={[
          styles.variantContainer,
          {
            backgroundColor: isSelected ? '#20abeb' : 'white',
          },
        ]}>
        <Text
          style={[styles.variantText, {color: isSelected ? 'white' : 'black'}]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCenter = ({item}) => {
    const isSelected = selectedCenter === item;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCenter(isSelected ? null : item)}
        style={[
          styles.variantContainer,
          {
            backgroundColor: isSelected ? '#20abeb' : 'white',
          },
        ]}>
        <Text
          style={[styles.variantText, {color: isSelected ? 'white' : 'black'}]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      multiple: true,
    })
      .then(image => {
        const imgpath = image.map(img => img.path);
        setSelectedImage(imgpath);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeImage = index => {
    const newImages = selectedImage.filter(
      (img, imgIndex) => imgIndex !== index,
    );
    setSelectedImage(newImages);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1}}>
        {/* Popular Brands */}
        <View style={styles.brandsContainer}>
          <Text style={styles.subHeading}>Here's some Popular Brands</Text>
          <FlatList
            data={Object.keys(groupedCars)}
            renderItem={({item}) => renderBrand(item)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
          />
        </View>

        {/* Year */}

        <View style={styles.yearsContainer}>
          <Text style={styles.subHeading}>Years</Text>
          <FlatList
            data={
              selectedBrand
                ? [...new Set(groupedCars[selectedBrand].map(car => car.year))]
                : []
            }
            renderItem={renderYear}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Model details */}

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
            Model details
          </Text>
          <View style={{marginTop: 15}}>
            <Text>
              Here's some Popular {selectedBrand} {selectedYear} models
            </Text>
            <FlatList
              data={selectedModelCars}
              renderItem={renderModel}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        {/* variant */}

        <View style={{marginTop: 25}}>
          <Text style={{fontWeight: '500'}}>
            Select a variant for the {selectedModel.model} {selectedYear} model
          </Text>
          <View style={{backgroundColor: 'white', marginTop: 10, padding: 8}}>
            <Text style={{color: 'black', fontSize: 16}}>{item.Variant}</Text>
          </View>
          {/* <FlatList
                data={selectedModel.variants}
                renderItem={renderVariant}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              /> */}
        </View>

        {/* Car condition */}

        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: '500'}}>Specify the car condition</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          {renderCondition('New Car')}
          {renderCondition('Used Car')}
        </View>

        {/* choose color */}

        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: '500'}}>Choose the color</Text>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 10, padding: 8}}>
          <Text style={{color: 'black', fontSize: 16}}>{item.Color}</Text>
        </View>
        {/* <FlatList
                  data={selectedModel.Colors}
                  renderItem={renderColor}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                /> */}

        {/* Registation Center */}

        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: '500'}}>
            Select the registration center
          </Text>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 10, padding: 8}}>
          <Text style={{color: 'black', fontSize: 16}}>
            {item.RegistationCenter}
          </Text>
        </View>
        {/* <FlatList
                  data={selectedModel.RegistationCenter}
                  renderItem={renderCenter}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                /> */}

        {/* uplode Car image */}

        <View style={{marginTop: 25}}>
          <Text style={{fontWeight: '700', color: 'black', fontSize: 16}}>
            Car photos
          </Text>
          <Text style={{fontWeight: '500', marginTop: 10}}>
            Tips for adding photos
          </Text>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="checkmark" color="#20abeb" size={30} />
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text>Add at least 2 photos</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="checkmark" color="#20abeb" size={30} />
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text>Front, Back, Sides, Interior and Engine</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="checkmark" color="#20abeb" size={30} />
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text>Don't use flash</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
            {selectedImage.map((image, index) => (
              <View
                key={index}
                style={{
                  margin: 5,
                  marginTop: 10,
                }}>
                <Image
                  source={{uri: image}}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 8,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Ad details */}

        <View style={{marginTop: 25}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: 'black',
            }}>
            Ad details
          </Text>
        </View>
        <View style={{marginBottom: 5, marginTop: 15}}>
          <Text style={{fontWeight: '600'}}>Give your add a title</Text>
        </View>
        <Textinput
          placeholder="Enter title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <View style={{marginBottom: 5, marginTop: 10}}>
          <Text style={{fontWeight: '600'}}>Asking price</Text>
        </View>
        <Textinput
          placeholder="Enter price"
          value={price}
          onChangeText={text => setPrice(text)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
  },
  headingText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#e7e9ee',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  brandsContainer: {
    marginTop: 20,
  },
  subHeading: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  brandContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  brandImage: {
    height: 50,
    width: 50,
  },
  yearsContainer: {
    marginTop: 20,
  },
  yearContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  yearText: {
    fontWeight: '600',
  },
  modelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modelText: {
    fontWeight: '600',
  },
  variantContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  variantText: {
    fontWeight: '600',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  conditionImage: {
    height: 50,
    width: 50,
  },
  conditionText: {
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default AllAdsDetailsScreen;
