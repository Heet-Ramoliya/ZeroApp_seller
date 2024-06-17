import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {db} from '../Firebase/Config';
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCars = () => {
  const [branddata, setBranddata] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [showYearSection, setShowYearSection] = useState(false);
  const [modelData, setModelData] = useState([]);
  const [selectedModelName, setSelectedModelName] = useState('');
  const [selectedModelImage, setSelectedModelImage] = useState('');
  const [showModelSection, setShowModelSection] = useState(false);
  const [varientData, setVarientData] = useState([]);
  const [showVarientSection, setShowVarientSection] = useState(false);
  const [selectVarient, setSelecteVarient] = useState('');
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [colorData, setColorData] = useState([]);
  const [showColorSection, setShowColorSection] = useState(false);
  const [selectColor, setSelecteColor] = useState('');
  const [registationCenterData, setRegistationCenterData] = useState([]);
  const [showregistationCenterSection, setShowregistationCenterSection] =
    useState(false);
  const [selectregistationCenter, setSelecteregistationCenter] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);
  const [brandid, setBrandid] = useState('');
  const [yearId, setYearId] = useState('');
  const [modelId, setModelId] = useState('');
  const [varientId, setVarientId] = useState('');
  const [colorId, setColorId] = useState('');
  const [RegistationCenterId, setRegistationCenterId] = useState('');
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [userId, setUserId] = useState('');

  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (
    brandName &&
    selectedYear &&
    selectedModelName &&
    selectedModelImage &&
    selectVarient &&
    selectedCondition &&
    selectColor &&
    selectregistationCenter &&
    selectedImage &&
    title &&
    price
  ) {
    console.log('brandName ==> ', brandName);
    console.log('selectedYear ==> ', selectedYear);
    console.log('selectedModelName ==> ', selectedModelName);
    console.log('selectedModelImage ==> ', selectedModelImage);
    console.log('selectVarient ==> ', selectVarient);
    console.log('selectedCondition ==> ', selectedCondition);
    console.log('selectColor ==> ', selectColor);
    console.log('selectregistationCenter ==> ', selectregistationCenter);
    console.log('selectedImage ==> ', selectedImage);
    console.log('title ==> ', title);
    console.log('price ==> ', price);
    console.log('------------------------------------------------');
  }

  useEffect(() => {
    getBrandData();
  }, []);

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    if (brandid) {
      getYear(brandid);
    }
  }, [brandid]);

  useEffect(() => {
    if (brandid && yearId) {
      getModel(brandid, yearId);
    }
  }, [brandid, yearId]);

  useEffect(() => {
    if (brandid && yearId && modelId) {
      getVarient(brandid, yearId, modelId);
    }
  }, [brandid, yearId, modelId]);

  useEffect(() => {
    if (brandid && yearId && modelId && varientId) {
      getColor(brandid, yearId, modelId, varientId);
    }
  }, [brandid, yearId, modelId, varientId]);

  useEffect(() => {
    if (brandid && yearId && modelId && varientId) {
      getRegistationCenter(brandid, yearId, modelId, varientId);
    }
  }, [brandid, yearId, modelId, varientId]);

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

  const getBrandData = async () => {
    try {
      const q = query(collection(db, 'CarsData'));
      const docSnap = await getDocs(q);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data(), id: doc.id});
      });
      setBranddata(list);
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getYear = async brandId => {
    try {
      const yeardata = query(collection(db, `CarsData/${brandId}/year`));
      const docSnap = await getDocs(yeardata);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data(), id: doc.id});
      });
      setYear(list);
      setShowYearSection(true);
    } catch (error) {
      console.error('Error fetching year data: ', error);
    }
  };

  const getModel = async (brandId, yearId) => {
    try {
      const modeldata = query(
        collection(db, `CarsData/${brandId}/year/${yearId}/model`),
      );
      const docSnap = await getDocs(modeldata);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data(), id: doc.id});
      });
      setModelData(list);
      setShowModelSection(true);
    } catch (error) {
      console.error('Error fetching year data: ', error);
    }
  };

  const getVarient = async (brandId, yearId, modelId) => {
    try {
      const Varientdata = query(
        collection(
          db,
          `CarsData/${brandId}/year/${yearId}/model/${modelId}/varient`,
        ),
      );
      const docSnap = await getDocs(Varientdata);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data(), id: doc.id});
      });
      setVarientData(list);
      setShowVarientSection(true);
    } catch (error) {
      console.error('Error fetching year data: ', error);
    }
  };

  const getColor = async (brandId, yearId, modelId, varientId) => {
    try {
      const Colordata = query(
        collection(
          db,
          `CarsData/${brandId}/year/${yearId}/model/${modelId}/varient/${varientId}/color`,
        ),
      );
      const docSnap = await getDocs(Colordata);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data(), id: doc.id});
      });
      setColorData(list);
      setShowColorSection(true);
    } catch (error) {
      console.error('Error fetching year data: ', error);
    }
  };

  const getRegistationCenter = async (brandId, yearId, modelId, varientId) => {
    try {
      const RegistrationCenterdata = query(
        collection(
          db,
          `CarsData/${brandId}/year/${yearId}/model/${modelId}/varient/${varientId}/RegistrationCenter`,
        ),
      );
      const docSnap = await getDocs(RegistrationCenterdata);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data(), id: doc.id});
      });
      setRegistationCenterData(list);
      setShowregistationCenterSection(true);
    } catch (error) {
      console.error('Error fetching year data: ', error);
    }
  };

  const renderBrand = ({item}) => {
    const isSelected = brandid === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setBrandName(item.brand);
          setBrandid(item.id);
        }}>
        <View
          style={{
            padding: 8,
            marginRight: 10,
            backgroundColor: isSelected ? '#20abeb' : 'white',
            borderRadius: 100,
          }}>
          <Image
            source={{uri: item.brandLogo}}
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
              overflow: 'hidden',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderYear = ({item}) => {
    const isSelected = yearId === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedYear(item.year);
          setYearId(item.id);
        }}>
        <View
          style={{
            padding: 8,
            marginRight: 10,
            backgroundColor: isSelected ? '#20abeb' : 'white',
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 5,
            elevation: 4,
          }}>
          <Text
            style={{
              color: isSelected ? 'white' : 'black',
              fontSize: 18,
              padding: 6,
            }}>
            {item.year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModel = ({item}) => {
    const isSelected = modelId === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setModelId(item.id);
          setSelectedModelName(item.name);
          setSelectedModelImage(item.image);
        }}>
        <View
          style={{
            padding: 8,
            marginRight: 10,
            backgroundColor: isSelected ? '#20abeb' : 'white',
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 5,
            elevation: 4,
          }}>
          <Image
            source={{uri: item.image}}
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
              overflow: 'hidden',
              padding: 8,
            }}
          />
          <View style={{}}>
            <Text
              style={{
                color: isSelected ? 'white' : 'black',
                fontSize: 18,
                padding: 6,
                textAlign: 'center',
              }}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderVarient = ({item}) => {
    const isSelected = varientId === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setVarientId(item.id);
          setSelecteVarient(item.varient);
        }}>
        <View
          style={{
            padding: 8,
            marginRight: 10,
            backgroundColor: isSelected ? '#20abeb' : 'white',
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 5,
            elevation: 4,
          }}>
          <Text
            style={{
              color: isSelected ? 'white' : 'black',
              fontSize: 18,
              padding: 6,
            }}>
            {item.varient}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCondition = condition => {
    const isSelected = selectedCondition === condition;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCondition(isSelected ? null : condition)}
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
      </TouchableOpacity>
    );
  };

  const renderColor = ({item}) => {
    const isSelected = colorId === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setColorId(item.id);
          setSelecteColor(item.color);
        }}>
        <View
          style={{
            padding: 8,
            marginRight: 10,
            backgroundColor: isSelected ? '#20abeb' : 'white',
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 5,
            elevation: 4,
          }}>
          <Text
            style={{
              color: isSelected ? 'white' : 'black',
              fontSize: 18,
              padding: 6,
            }}>
            {item.color}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRegistationCenter = ({item}) => {
    const isSelected = RegistationCenterId === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setRegistationCenterId(item.id);
          setSelecteregistationCenter(item.name);
        }}>
        <View
          style={{
            padding: 8,
            marginRight: 10,
            backgroundColor: isSelected ? '#20abeb' : 'white',
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 5,
            elevation: 4,
          }}>
          <Text
            style={{
              color: isSelected ? 'white' : 'black',
              fontSize: 18,
              padding: 6,
            }}>
            {item.name}
          </Text>
        </View>
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

  const saveData = async () => {
    try {
      const docData = {
        Brand: brandName,
        Year: selectedYear,
        ModelName: selectedModelName,
        ModelImage: selectedModelImage,
        Variant: selectVarient,
        Carcondition: selectedCondition,
        Color: selectColor,
        RegistationCenter: selectregistationCenter,
        CarPhotos: selectedImage,
        Title: title,
        Price: price,
        postedDate: formattedDate,
        UserId: userId,
      };

      await addDoc(collection(db, 'CreateAD'), docData);
      console.log('Data inserted successfully!');
    } catch (error) {
      console.error('Error ==> ', error);
    }
  };

  const addDataIntoDraft = async () => {
    try {
      const docData = {
        Brand: brandName,
        Year: selectedYear,
        ModelName: selectedModelName,
        ModelImage: selectedModelImage,
        Variant: selectVarient,
        Carcondition: selectedCondition,
        Color: selectColor,
        RegistationCenter: selectregistationCenter,
        CarPhotos: selectedImage,
        Title: title,
        Price: price,
        postedDate: formattedDate,
        UserId: userId,
      };

      await addDoc(collection(db, 'Seller_Draft'), docData);
      console.log('Data inserted into Seller_Draft successfully!');
    } catch (error) {
      console.error('Error ==> ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1}}>
        {/* Popular Brands */}
        <View style={styles.brandsContainer}>
          <Text style={styles.subHeading}>Here's some Popular Brands</Text>
          <FlatList
            data={branddata}
            renderItem={renderBrand}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        {/* Display Years Only After Brand Selection */}
        {showYearSection && (
          <>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 18,
                marginBottom: 10,
                color: 'black',
                marginTop: 10,
              }}>
              Years
            </Text>
            <FlatList
              data={year}
              renderItem={renderYear}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}

        {/* show all model of car */}
        {showYearSection && showModelSection && selectedYear && (
          <>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 18,
                marginBottom: 10,
                color: 'black',
                marginTop: 25,
              }}>
              Model details
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'black',
                textAlign: 'justify',
                marginBottom: 10,
              }}>
              Here's some Popular {brandName} {selectedYear}
            </Text>
            <FlatList
              data={modelData}
              renderItem={renderModel}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}

        {/* select model all varients */}
        {showYearSection &&
          showModelSection &&
          showVarientSection &&
          selectedYear &&
          selectedModelName &&
          selectedModelImage && (
            <>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: 'black',
                  textAlign: 'justify',
                  marginBottom: 10,
                  marginTop: 20,
                }}>
                Select a varient for the {selectedModelName} {selectedYear}{' '}
                model
              </Text>
              <FlatList
                data={varientData}
                renderItem={renderVarient}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}

        {/* Car condition */}
        {showYearSection &&
          showModelSection &&
          showVarientSection &&
          showVarientSection &&
          selectedYear &&
          selectedModelName &&
          selectedModelImage &&
          selectVarient && (
            <>
              <View style={{marginTop: 20}}>
                <Text style={{fontWeight: '500'}}>
                  Specify the car condition
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 10,
                  marginHorizontal: 10,
                }}>
                {renderCondition('New Car')}
                {renderCondition('Old Car')}
              </View>
            </>
          )}

        {/* select car color */}
        {showYearSection &&
          showModelSection &&
          showVarientSection &&
          showVarientSection &&
          showColorSection &&
          selectedYear &&
          selectedModelName &&
          selectedModelImage &&
          selectVarient &&
          selectedCondition && (
            <>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: 'black',
                  textAlign: 'justify',
                  marginBottom: 10,
                  marginTop: 20,
                }}>
                Choose the color
              </Text>
              <FlatList
                data={colorData}
                renderItem={renderColor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}

        {/* select Registaton center */}
        {showYearSection &&
          showModelSection &&
          showVarientSection &&
          showVarientSection &&
          showColorSection &&
          showregistationCenterSection &&
          selectedYear &&
          selectedModelName &&
          selectedModelImage &&
          selectVarient &&
          selectedCondition &&
          selectColor && (
            <>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: 'black',
                  textAlign: 'justify',
                  marginBottom: 10,
                  marginTop: 20,
                }}>
                Select the registration center
              </Text>
              <FlatList
                data={registationCenterData}
                renderItem={renderRegistationCenter}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}

        {/* image picker */}
        {selectedYear &&
          selectedModelName &&
          selectedModelImage &&
          selectVarient &&
          selectedCondition &&
          selectColor &&
          selectedCondition &&
          selectregistationCenter && (
            <>
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
                      <TouchableOpacity
                        onPress={() => {
                          removeImage(index);
                        }}
                        style={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                          backgroundColor: '#d4d2d1',
                          borderRadius: 12,
                          padding: 5,
                          justifyContent: 'flex-end',
                        }}>
                        <Icons name="cross" size={20} color="#9a9ea7" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={uploadImage}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: '#d5eefb',
                      justifyContent: 'center',
                      borderRadius: 100,
                      padding: 8,
                      marginTop: 10,
                    }}>
                    <Icon name="camera-outline" color="#20abeb" size={30} />
                    <View style={{justifyContent: 'center', marginLeft: 5}}>
                      <Text style={{color: '#20abeb'}}>
                        Add your own pictures
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}

        {/* Ad details */}
        {selectedYear &&
          selectedModelName &&
          selectedModelImage &&
          selectVarient &&
          selectedCondition &&
          selectColor &&
          selectedCondition &&
          selectregistationCenter &&
          selectedImage && (
            <>
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
            </>
          )}

        {/* Buttons */}
        {selectedYear &&
          selectedModelName &&
          selectedModelImage &&
          selectVarient &&
          selectedCondition &&
          selectColor &&
          selectedCondition &&
          selectregistationCenter &&
          selectedImage && (
            <>
              <TouchableOpacity onPress={saveData}>
                <Button
                  name="Review and Publish"
                  backgroundColor="#01a0e9"
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={addDataIntoDraft}>
                <Button
                  name="Save as Draft"
                  backgroundColor="#d5eefb"
                  color="#0084cc"
                />
              </TouchableOpacity>
            </>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  brandsContainer: {
    marginTop: 0,
  },
  subHeading: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 20,
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

export default AddCars;
