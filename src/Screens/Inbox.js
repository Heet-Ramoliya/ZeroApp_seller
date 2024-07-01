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
import messaging from '@react-native-firebase/messaging';
import {constant} from '../Constant/constant';

const Inbox = ({navigation, route}) => {
  const [buyerData, setBuyerData] = useState([]);
  const [userId, setUserId] = useState('');
  const [buyersWithMessages, setBuyersWithMessages] = useState([]);
  const [businessProfileData, setBusinessProfileData] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(true);

  const sendPushNotifications = async (body, title) => {
    let token = await messaging().getToken();

    const requestPayload = {
      message: {
        token: token,
        data: {},
        notification: {
          body: body,
          title: title,
        },
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: constant.ACCESS_TOKEN,
    };

    let response = await fetch(
      'https://fcm.googleapis.com/v1/projects/zeroapp-66e9a/messages:send',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestPayload),
      },
    );

    if (response.ok) {
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
    } else {
      console.error(
        'Failed to send push notification:',
        response.status,
        response.statusText,
      );
    }
  };

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
          const buyersWithMessages = Object.keys(data)
            .filter(key => key.includes(`To${businessName}`))
            .map(key => {
              const buyerId = key.split('To')[0];
              const buyer = buyerData.find(
                buyer => buyer.FirstName === buyerId,
              );

              if (buyer) {
                const messageData = data[key];
                const lastMessage = Object.values(messageData).reduce(
                  (latest, msg) =>
                    !latest || msg.createdAt > latest.createdAt ? msg : latest,
                  null,
                );

                sendPushNotifications(lastMessage.text, buyer.FirstName);

                return {
                  ...buyer,
                  lastMessageText: lastMessage ? lastMessage.text : null,
                  lastMessageTime: lastMessage ? lastMessage.time : null,
                };
              }
              return null;
            })
            .filter(Boolean);

          setBuyersWithMessages(buyersWithMessages);
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
        navigation.navigate('Chat', {
          data: item,
          chatTitle: item.FirstName,
        });
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
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 17, color: 'black', fontWeight: '500'}}>
                  {item.FirstName}
                </Text>
                <Text>{item.lastMessageText}</Text>
              </View>

              <View style={{justifyContent: 'center'}}>
                <Text>{item.lastMessageTime}</Text>
                {/* <Icons name="angle-right" size={20} color="#20abeb" /> */}
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
