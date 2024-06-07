// import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
//   where,
// } from 'firebase/firestore';
// import {db, RealTimeDatabase} from '../Firebase/Config';
// import Icons from 'react-native-vector-icons/FontAwesome6';
// import {onValue, ref} from 'firebase/database';

// const Inbox = ({navigation}) => {
//   const [buyerdata, setBuyerData] = useState([]);
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const getUserIdFromStorage = async () => {
//       try {
//         const id = await AsyncStorage.getItem('UserId');
//         if (id !== null) {
//           setUserId(id);
//         }
//       } catch (error) {
//         console.error('Error retrieving userId from AsyncStorage:', error);
//       }
//     };

//     getUserIdFromStorage();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const q = query(collection(db, 'Name'));

//       const unsubscribe = onSnapshot(
//         q,
//         querySnapshot => {
//           const List = [];
//           querySnapshot.forEach(doc => {
//             List.push({...doc.data()});
//           });
//           setBuyerData(List);
//         },
//         error => {
//           console.error('Error listening for changes:', error);
//         },
//       );

//       return () => unsubscribe();
//     }
//   }, [userId]);

//   const renderItem = ({item}) => {
//     return (
//       <>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('Chat', {data: item});
//           }}>
//           <View
//             style={{
//               marginHorizontal: 10,
//               marginVertical: 10,
//               backgroundColor: 'white',
//               borderRadius: 20,
//             }}>
//             <View style={{flexDirection: 'row', padding: 8}}>
//               <View>
//                 <Image
//                   source={{uri: item.image}}
//                   resizeMode={'contain'}
//                   style={{height: 50, width: 50, borderRadius: 100}}
//                 />
//               </View>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   marginHorizontal: 10,
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={{fontSize: 17, color: 'black', fontWeight: '500'}}>
//                     {item.FirstName}
//                   </Text>
//                   <View style={{justifyContent: 'center'}}>
//                     <Icons name="angle-right" size={20} color="#20abeb" />
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </>
//     );
//   };

//   return (
//     <View>
//       <FlatList
//         data={buyerdata}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default Inbox;

// import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {collection, onSnapshot, query, where} from 'firebase/firestore';
// import {db, RealTimeDatabase} from '../Firebase/Config';
// import Icons from 'react-native-vector-icons/FontAwesome6';
// import {onValue, ref} from 'firebase/database';

// const Inbox = ({navigation}) => {
//   const [buyerData, setBuyerData] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [buyersWithMessages, setBuyersWithMessages] = useState([]);
//   const [businessProfileData, setBusinessProfileData] = useState([]);
//   const [businessName, setBusinessName] = useState('');

//   useEffect(() => {
//     const getUserIdFromStorage = async () => {
//       try {
//         const id = await AsyncStorage.getItem('UserId');
//         if (id !== null) {
//           setUserId(id);
//         }
//       } catch (error) {
//         console.error('Error retrieving userId from AsyncStorage:', error);
//       }
//     };

//     getUserIdFromStorage();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const q = query(collection(db, 'Name'));

//       const unsubscribe = onSnapshot(
//         q,
//         querySnapshot => {
//           const list = [];
//           querySnapshot.forEach(doc => {
//             list.push({...doc.data()});
//           });
//           setBuyerData(list);
//         },
//         error => {
//           console.error('Error listening for changes:', error);
//         },
//       );

//       return () => unsubscribe();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       const q = query(
//         collection(db, 'Seller_BusinessInfo'),
//         where('UserId', '==', userId),
//       );

//       const unsubscribe = onSnapshot(
//         q,
//         querySnapshot => {
//           const list = [];
//           querySnapshot.forEach(doc => {
//             list.push({...doc.data()});
//           });
//           setBusinessProfileData(list);
//           if (list.length > 0) {
//             const user = list[0];
//             setBusinessName(user.BusinessName);
//           }
//         },
//         error => {
//           console.error('Error listening for changes:', error);
//         },
//       );

//       return () => unsubscribe();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId && businessName) {
//       const sellerChatsRef = ref(RealTimeDatabase, `Users`);

//       const unsubscribe = onValue(sellerChatsRef, snapshot => {
//         const data = snapshot.val();
//         if (data) {
//           const buyers = Object.keys(data)
//             .filter(key => key.includes(`To${businessName}`))
//             .map(key => {
//               const buyerId = key.split('To')[0];
//               console.log('buyerId ==> ', buyerId);
//               return buyerData.find(buyer => buyer.FirstName === buyerId);
//             })
//             .filter(Boolean);

//           setBuyersWithMessages(buyers);
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, [userId, buyerData, businessName]);

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate('Chat', {data: item});
//       }}>
//       <View
//         style={{
//           marginHorizontal: 10,
//           marginVertical: 10,
//           backgroundColor: 'white',
//           borderRadius: 20,
//         }}>
//         <View style={{flexDirection: 'row', padding: 8}}>
//           <View>
//             <Image
//               source={{uri: item.image}}
//               resizeMode={'contain'}
//               style={{height: 50, width: 50, borderRadius: 100}}
//             />
//           </View>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               marginHorizontal: 10,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
//               <Text style={{fontSize: 17, color: 'black', fontWeight: '500'}}>
//                 {item.FirstName}
//               </Text>
//               <View style={{justifyContent: 'center'}}>
//                 <Icons name="angle-right" size={20} color="#20abeb" />
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       {buyersWithMessages.length > 0 ? (
//         <FlatList
//           data={buyersWithMessages}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Text style={{fontWeight: '500', fontSize: 16, color: 'black'}}>
//             No buyer send message
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Inbox;

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {db, RealTimeDatabase} from '../Firebase/Config';
import Icons from 'react-native-vector-icons/FontAwesome6';
import {onValue, ref} from 'firebase/database';

const Inbox = ({navigation}) => {
  const [buyerData, setBuyerData] = useState([]);
  const [userId, setUserId] = useState('');
  const [buyersWithMessages, setBuyersWithMessages] = useState([]);
  const [businessProfileData, setBusinessProfileData] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(true);

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
      const q = query(collection(db, 'Name'));

      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            list.push({...doc.data()});
          });
          setBuyerData(list);
        },
        error => {
          console.error('Error listening for changes:', error);
        },
      );

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, 'Seller_BusinessInfo'),
        where('UserId', '==', userId),
      );

      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            list.push({...doc.data()});
          });
          setBusinessProfileData(list);
          if (list.length > 0) {
            const user = list[0];
            setBusinessName(user.BusinessName);
          }
        },
        error => {
          console.error('Error listening for changes:', error);
        },
      );

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && businessName) {
      const sellerChatsRef = ref(RealTimeDatabase, `Users`);

      const unsubscribe = onValue(sellerChatsRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          const buyers = Object.keys(data)
            .filter(key => key.includes(`To${businessName}`))
            .map(key => {
              const buyerId = key.split('To')[0];
              return buyerData.find(buyer => buyer.FirstName === buyerId);
            })
            .filter(Boolean);

          setBuyersWithMessages(buyers);
        } else {
          setBuyersWithMessages([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [userId, buyerData, businessName]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {data: item});
      }}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <View style={{flexDirection: 'row', padding: 8}}>
          <View>
            <Image
              source={{uri: item.image}}
              resizeMode={'contain'}
              style={{height: 50, width: 50, borderRadius: 100}}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 17, color: 'black', fontWeight: '500'}}>
                {item.FirstName}
              </Text>
              <View style={{justifyContent: 'center'}}>
                <Icons name="angle-right" size={20} color="#20abeb" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : buyersWithMessages.length > 0 ? (
        <FlatList
          data={buyersWithMessages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '500', fontSize: 16, color: 'black'}}>
            No buyer send message
          </Text>
        </View>
      )}
    </View>
  );
};

export default Inbox;
