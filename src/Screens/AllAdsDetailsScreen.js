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
import {Checkbox} from 'react-native-paper';

const AllAdsDetailsScreen = ({route}) => {
  const {item} = route.params;

  const [branddata, setBranddata] = useState([]);
  const [brandName, setBrandName] = useState(item.Brand);
  const [brandLogo, setBrandLogo] = useState(item.BrandLogo);
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState(item.Year);
  const [showYearSection, setShowYearSection] = useState(false);
  const [modelData, setModelData] = useState([]);
  const [selectedModelName, setSelectedModelName] = useState(item.ModelName);
  const [selectedModelImage, setSelectedModelImage] = useState(item.ModelImage);
  const [showModelSection, setShowModelSection] = useState(false);
  const [varientData, setVarientData] = useState([]);
  const [showVarientSection, setShowVarientSection] = useState(false);
  const [selectVarient, setSelecteVarient] = useState(item.Variant);
  const [selectedCondition, setSelectedCondition] = useState(item.Carcondition);
  const [colorData, setColorData] = useState([]);
  const [showColorSection, setShowColorSection] = useState(false);
  const [selectColor, setSelecteColor] = useState(item.Color);
  const [registationCenterData, setRegistationCenterData] = useState([]);
  const [showregistationCenterSection, setShowregistationCenterSection] =
    useState(false);
  const [selectregistationCenter, setSelecteregistationCenter] = useState(
    item.RegistationCenter,
  );
  const [selectedImage, setSelectedImage] = useState(item.CarPhotos || []);
  const [Interiordata, setInteriordata] = useState([]);
  const [Exteriordata, setExteriordata] = useState([]);
  const [brandid, setBrandid] = useState('');
  const [yearId, setYearId] = useState('');
  const [modelId, setModelId] = useState('');
  const [varientId, setVarientId] = useState('');
  const [colorId, setColorId] = useState('');
  const [RegistationCenterId, setRegistationCenterId] = useState('');
  const [title, setTitle] = useState(item.Title);
  const [price, setPrice] = useState(item.Price);
  const [name, setName] = useState(item.Name);
  const [city, setCity] = useState(item.City);
  const [state, setState] = useState(item.State);
  const [country, setCountry] = useState(item.country);
  const [contactNumber, setContactNumber] = useState(item.ContactNumber);
  const [userId, setUserId] = useState('');
  const [selectedInteriorOptions, setSelectedInteriorOptions] = useState(
    item.Interior || [],
  );
  const [selectedExteriorOptions, setselectedExteriorOptions] = useState(
    item.Exterior || [],
  );
  const [checked, setChecked] = useState(item.Checked);

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
    getBrandData();
    getBrandId();
    getInterior();
    getExterior();
  }, [brandid, varientId, colorId, RegistationCenterId]);

  useEffect(() => {
    if (brandid) {
      getYear();
      getYearId();
    }
  }, [brandid]);

  useEffect(() => {
    if (brandid && yearId) {
      getModel();
      getModelId();
    }
  }, [brandid, yearId]);

  useEffect(() => {
    if (brandid && yearId && modelId) {
      getVarient();
      getVarientId();
    }
  }, [brandid, yearId, modelId]);

  useEffect(() => {
    if (brandid && yearId && modelId && varientId) {
      getColor();
      getColorId();
    }
  }, [brandid, yearId, modelId, varientId]);

  useEffect(() => {
    if (brandid && yearId && modelId && varientId) {
      getRegistationCenter();
      getRegistationCenterId();
    }
  }, [brandid, yearId, modelId, varientId]);

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

  const getBrandId = async () => {
    try {
      const q = query(
        collection(db, 'CarsData'),
        where('brand', '==', brandName),
      );
      const docSnap = await getDocs(q);

      docSnap.forEach(doc => {
        setBrandid(doc.id);
      });
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getYear = async () => {
    try {
      const yeardata = query(collection(db, `CarsData/${brandid}/year`));
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

  const getYearId = async () => {
    try {
      const q = query(
        collection(db, `CarsData/${brandid}/year`),
        where('year', '==', selectedYear),
      );
      const docSnap = await getDocs(q);

      docSnap.forEach(doc => {
        setYearId(doc.id);
      });
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getModel = async () => {
    try {
      const modeldata = query(
        collection(db, `CarsData/${brandid}/year/${yearId}/model`),
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

  const getModelId = async () => {
    try {
      const q = query(
        collection(db, `CarsData/${brandid}/year/${yearId}/model`),
        where('name', '==', selectedModelName),
      );
      const docSnap = await getDocs(q);

      docSnap.forEach(doc => {
        setModelId(doc.id);
      });
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getVarient = async () => {
    try {
      const Varientdata = query(
        collection(
          db,
          `CarsData/${brandid}/year/${yearId}/model/${modelId}/varient`,
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

  const getVarientId = async () => {
    try {
      const q = query(
        collection(
          db,
          `CarsData/${brandid}/year/${yearId}/model/${modelId}/varient`,
        ),
        where('varient', '==', selectVarient),
      );
      const docSnap = await getDocs(q);

      docSnap.forEach(doc => {
        setVarientId(doc.id);
      });
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getColor = async () => {
    try {
      const Colordata = query(
        collection(
          db,
          `CarsData/${brandid}/year/${yearId}/model/${modelId}/varient/${varientId}/color`,
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

  const getColorId = async () => {
    try {
      const q = query(
        collection(
          db,
          `CarsData/${brandid}/year/${yearId}/model/${modelId}/varient/${varientId}/color`,
        ),
        where('color', '==', selectColor),
      );
      const docSnap = await getDocs(q);

      docSnap.forEach(doc => {
        setColorId(doc.id);
      });
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const getRegistationCenter = async () => {
    try {
      const RegistrationCenterdata = query(
        collection(
          db,
          `CarsData/${brandid}/year/${yearId}/model/${modelId}/varient/${varientId}/RegistrationCenter`,
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

  const getRegistationCenterId = async () => {
    try {
      const q = query(
        collection(
          db,
          `CarsData/${brandid}/year/${yearId}/model/${modelId}/varient/${varientId}/RegistrationCenter`,
        ),
        where('name', '==', selectregistationCenter),
      );
      const docSnap = await getDocs(q);

      docSnap.forEach(doc => {
        setRegistationCenterId(doc.id);
      });
    } catch (error) {
      console.error('Error fetching brand data: ', error);
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
    const isSelected = brandLogo === item.brandLogo;
    return (
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
    );
  };

  const renderYear = ({item}) => {
    const isSelected = selectedYear === item.year;
    return (
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
    );
  };

  const renderModel = ({item}) => {
    const isSelected = selectedModelImage === item.image;
    return (
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
    );
  };

  const renderVarient = ({item}) => {
    const isSelected = selectVarient === item.varient;
    return (
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
    );
  };

  const renderCondition = condition => {
    const isSelected = selectedCondition === condition;
    return (
      <View
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
      </View>
    );
  };

  const renderColor = ({item}) => {
    const isSelected = selectColor === item.color;
    return (
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
    );
  };

  const renderRegistationCenter = ({item}) => {
    const isSelected = selectregistationCenter === item.name;
    return (
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
          // onPress={() => {
          //   setSelectedInteriorOptions(prevState => {
          //     if (!Array.isArray(prevState)) {
          //       prevState = [];
          //     }
          //     if (isSelected) {
          //       return prevState.filter(option => option !== item.name);
          //     } else {
          //       return [...prevState, item.name];
          //     }
          //   });
          // }}
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
          // onPress={() => {
          //   setselectedExteriorOptions(prevState => {
          //     if (!Array.isArray(prevState)) {
          //       prevState = [];
          //     }
          //     if (isSelected) {
          //       return prevState.filter(option => option !== item.name);
          //     } else {
          //       return [...prevState, item.name];
          //     }
          //   });
          // }}
        />
      </View>
    );
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
        {brandid && (
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
        {brandid && yearId && (
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
        {brandid && yearId && modelId && (
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
              Select a varient for the {selectedModelName} {selectedYear} model
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
        {brandid && yearId && modelId && varientId && (
          <>
            <View style={{marginTop: 20}}>
              <Text style={{fontWeight: '500'}}>Specify the car condition</Text>
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
        {brandid && yearId && modelId && varientId && colorId && (
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
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

        {/* Interior options */}
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
        {brandid &&
          yearId &&
          modelId &&
          varientId &&
          colorId &&
          RegistationCenterId && (
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
                  // onPress={() => {
                  //   toggleCheckbox();
                  // }}
                />
              </View>
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

export default AllAdsDetailsScreen;
