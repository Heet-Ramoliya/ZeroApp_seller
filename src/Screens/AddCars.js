import React, {useState, useEffect, useId} from 'react';
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
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Checkbox} from 'react-native-paper';

const AddCars = ({navigation}) => {
  const [branddata, setBranddata] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
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
  const [Interiordata, setInteriordata] = useState([]);
  const [Exteriordata, setExteriordata] = useState([]);
  const [brandid, setBrandid] = useState('');
  const [yearId, setYearId] = useState('');
  const [modelId, setModelId] = useState('');
  const [varientId, setVarientId] = useState('');
  const [colorId, setColorId] = useState('');
  const [RegistationCenterId, setRegistationCenterId] = useState('');
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [userId, setUserId] = useState('');
  const [selectedInteriorOptions, setSelectedInteriorOptions] = useState([]);
  const [selectedExteriorOptions, setselectedExteriorOptions] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [checked, setChecked] = useState(false);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [businessDesc, setBusinessDesc] = useState([]);
  const [businessShowRoomLocation, setbusinessShowRoomLocation] = useState([]);
  const [businessWorkingHours, setBusinessWorkingHours] = useState([]);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
  }, [userId]);

  useEffect(() => {
    getBrandData();
    getInterior();
    getExterior();
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

  const fetchDataByUserId = async (collectionName, setDataCallback) => {
    if (userId) {
      try {
        const q = query(
          collection(db, collectionName),
          where('UserId', '==', userId),
        );
        const docSnap = await getDocs(q);
        const list = docSnap.docs.map(doc => doc.data());
        setDataCallback(list);
      } catch (error) {
        console.error(`Error fetching ${collectionName} data: `, error);
      }
    }
  };

  useEffect(() => {
    fetchDataByUserId('Seller_BusinessInfo', setBusinessInfo);
    fetchDataByUserId('Seller_BusinessDesc', setBusinessDesc);
    fetchDataByUserId(
      'Seller_BusinessShowRoomLocation',
      setbusinessShowRoomLocation,
    );
    fetchDataByUserId('Seller_BusinessWorkingHours', setBusinessWorkingHours);
  }, [userId]);

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

  const getInterior = async () => {
    try {
      const q = query(collection(db, 'Interior_Options'));
      const docSnap = await getDocs(q);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data()});
      });
      setInteriordata(list);
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getExterior = async () => {
    try {
      const q = query(collection(db, 'Exterior_Options'));
      const docSnap = await getDocs(q);
      let list = [];
      docSnap.forEach(doc => {
        list.push({...doc.data()});
      });
      setExteriordata(list);
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const renderBrand = ({item}) => {
    const isSelected = brandid === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setBrandName(item.brand);
          setBrandid(item.id);
          setBrandLogo(item.brandLogo);
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

  const renderInterior = ({item}) => {
    const isSelected =
      Array.isArray(selectedInteriorOptions) &&
      selectedInteriorOptions.includes(item.name);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{item.name}</Text>
        <Checkbox
          color="#01a0e9"
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => {
            setSelectedInteriorOptions(prevState => {
              if (!Array.isArray(prevState)) {
                prevState = [];
              }
              if (isSelected) {
                return prevState.filter(option => option !== item.name);
              } else {
                return [...prevState, item.name];
              }
            });
          }}
        />
      </View>
    );
  };

  const renderExterior = ({item}) => {
    const isSelected =
      Array.isArray(selectedExteriorOptions) &&
      selectedExteriorOptions.includes(item.name);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{item.name}</Text>
        <Checkbox
          color="#01a0e9"
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => {
            setselectedExteriorOptions(prevState => {
              if (!Array.isArray(prevState)) {
                prevState = [];
              }
              if (isSelected) {
                return prevState.filter(option => option !== item.name);
              } else {
                return [...prevState, item.name];
              }
            });
          }}
        />
      </View>
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
      let docData = {
        Brand: brandName,
        BrandLogo: brandLogo,
        Year: selectedYear,
        ModelName: selectedModelName,
        ModelImage: selectedModelImage,
        Variant: selectVarient,
        Carcondition: selectedCondition,
        Color: selectColor,
        RegistationCenter: selectregistationCenter,
        CarPhotos: selectedImage,
        Interior: selectedInteriorOptions,
        Exterior: selectedExteriorOptions,
        Title: title,
        Price: price,
        postedDate: formattedDate,
        UserId: userId,
        Status: 'Active',
        Name: name,
        City: city,
        State: state,
        country: country,
        ContactNumber: contactNumber,
        Checked: checked,
      };

      if (checked) {
        docData = {
          ...docData,
          BusinessInfo: businessInfo,
          BusinessDesc: businessDesc,
          BusinessShowRoomLocation: businessShowRoomLocation,
          BusinessWorkingHours: businessWorkingHours,
        };
      }

      await addDoc(collection(db, 'CreateAD'), docData);
      console.log('Data inserted successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addDataIntoActive = async () => {
    try {
      let docData = {
        Brand: brandName,
        BrandLogo: brandLogo,
        Year: selectedYear,
        ModelName: selectedModelName,
        ModelImage: selectedModelImage,
        Variant: selectVarient,
        Carcondition: selectedCondition,
        Color: selectColor,
        RegistationCenter: selectregistationCenter,
        CarPhotos: selectedImage,
        Interior: selectedInteriorOptions,
        Exterior: selectedExteriorOptions,
        Title: title,
        Price: price,
        postedDate: formattedDate,
        UserId: userId,
        Status: 'Active',
        Name: name,
        City: city,
        State: state,
        country: country,
        ContactNumber: contactNumber,
        Checked: checked,
      };

      if (checked) {
        docData = {
          ...docData,
          BusinessInfo: businessInfo,
          BusinessDesc: businessDesc,
          BusinessShowRoomLocation: businessShowRoomLocation,
          BusinessWorkingHours: businessWorkingHours,
        };
      }

      await addDoc(collection(db, 'Seller_Active'), docData).then(() => {
        navigation.navigate('Dashboard');
        console.log('Data inserted into Seller_Active successfully!');
      });
    } catch (error) {
      console.error('Error ==> ', error);
    }
  };

  const addDataIntoDraft = async () => {
    try {
      let docData = {
        Brand: brandName,
        BrandLogo: brandLogo,
        Year: selectedYear,
        ModelName: selectedModelName,
        ModelImage: selectedModelImage,
        Variant: selectVarient,
        Carcondition: selectedCondition,
        Color: selectColor,
        RegistationCenter: selectregistationCenter,
        CarPhotos: selectedImage,
        Interior: selectedInteriorOptions,
        Exterior: selectedExteriorOptions,
        Title: title,
        Price: price,
        postedDate: formattedDate,
        UserId: userId,
        Status: 'Draft',
        Name: name,
        City: city,
        State: state,
        country: country,
        ContactNumber: contactNumber,
        Checked: checked,
      };

      if (checked) {
        docData = {
          ...docData,
          BusinessInfo: businessInfo,
          BusinessDesc: businessDesc,
          BusinessShowRoomLocation: businessShowRoomLocation,
          BusinessWorkingHours: businessWorkingHours,
        };
      }

      await addDoc(collection(db, 'Seller_Draft'), docData).then(() => {
        navigation.navigate('Dashboard');
        console.log('Data inserted into Seller_Draft successfully!');
      });
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

        {/* Interior options */}
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
                    fontSize: 17,
                    color: 'black',
                    marginBottom: 10,
                  }}>
                  Interior options
                </Text>
              </View>
              <FlatList
                data={Interiordata}
                renderItem={renderInterior}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}

        {/* Exterior options */}
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
                    fontSize: 17,
                    color: 'black',
                    marginBottom: 10,
                  }}>
                  Exterior options
                </Text>
              </View>
              <FlatList
                data={Exteriordata}
                renderItem={renderExterior}
                keyExtractor={(item, index) => index.toString()}
              />
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

        {/* Contact details */}
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
                  Contact details
                </Text>
              </View>
              <View style={{marginBottom: 5, marginTop: 15}}>
                <Text style={{fontWeight: '600'}}>Give your add a Name</Text>
              </View>
              <Textinput
                placeholder="Enter Name"
                value={name}
                onChangeText={text => setName(text)}
              />
              <View style={{marginBottom: 5, marginTop: 10}}>
                <Text style={{fontWeight: '600'}}>Give your add a city</Text>
              </View>
              <Textinput
                placeholder="Enter city"
                value={city}
                onChangeText={text => setCity(text)}
              />
              <View style={{marginBottom: 5, marginTop: 10}}>
                <Text style={{fontWeight: '600'}}>Give your add a state</Text>
              </View>
              <Textinput
                placeholder="Enter state"
                value={state}
                onChangeText={text => setState(text)}
              />
              <View style={{marginBottom: 5, marginTop: 10}}>
                <Text style={{fontWeight: '600'}}>Give your add a country</Text>
              </View>
              <Textinput
                placeholder="Enter country"
                value={country}
                onChangeText={text => setCountry(text)}
              />
              <View style={{marginBottom: 5, marginTop: 10}}>
                <Text style={{fontWeight: '600'}}>
                  Give your add a ContactNumber
                </Text>
              </View>
              <Textinput
                placeholder="Enter Contactnumber"
                value={contactNumber}
                onChangeText={text => setContactNumber(text)}
              />
            </>
          )}

        {/* Business Profile details */}
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
                  Business details
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Add Business details
                </Text>
                <Checkbox
                  color="#01a0e9"
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    toggleCheckbox();
                  }}
                />
              </View>
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
              <TouchableOpacity
                onPress={() => {
                  saveData();
                  addDataIntoActive();
                }}>
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
