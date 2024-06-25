import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, onValue, push, set} from 'firebase/database';
import {db, RealTimeDatabase} from '../Firebase/Config';
import moment from 'moment';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import messaging from '@react-native-firebase/messaging';

const Chat = ({route}) => {
  const {data} = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [storedUserId, setStoredUserId] = useState('');
  const [businessProfileData, setBusinessProfileData] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [businessLogo, setBusinessLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const id = await AsyncStorage.getItem('UserId');
        if (id) {
          setStoredUserId(id);
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
      }
    };

    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!storedUserId) return;

      const q = query(
        collection(db, 'Seller_BusinessInfo'),
        where('UserId', '==', storedUserId),
      );

      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            list.push({...doc.data()});
          });
          if (list.length > 0) {
            const user = list[0];
            setBusinessProfileData(list);
            setBusinessName(user.BusinessName);
            setBusinessLogo(user.BusinessLogo);
          }
          setLoading(false);
        },
        error => {
          console.error('Error listening for changes:', error);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    };

    fetchBusinessInfo();
  }, [storedUserId]);

  useEffect(() => {
    const listenForMessages = () => {
      if (!data.FirstName || !businessName) return;

      const chatsRef = ref(
        RealTimeDatabase,
        `Users/${data.FirstName}To${businessName}`,
      );
      onValue(chatsRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.keys(data).map(key => ({
            _id: key,
            createdAt: data[key].createdAt,
            time: data[key].currentTime,
            text: data[key].text,
            user: {
              _id: data[key].user._id,
            },
            msgType: data[key].msgType,
          }));
          setMessages(messagesArray.reverse());
        } else {
          setMessages([]);
        }
      });
    };

    listenForMessages();
  }, [data.FirstName, businessName]);

  const onSend = useCallback(
    async (messages = []) => {
      if (!storedUserId || !businessName || !businessLogo) {
        return;
      }

      messages.forEach(async message => {
        const timestamp = moment().valueOf();
        const newMessageRef = push(
          ref(RealTimeDatabase, `Users/${data.FirstName}To${businessName}`),
        );
        const newMessage = {
          createdAt: timestamp,
          time: currentTime,
          user: {
            _id: storedUserId,
          },
        };

        if (message.text) {
          newMessage.msgType = 'text';
          newMessage.text = message.text;
        }

        try {
          await set(newMessageRef, newMessage);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      });

      setText('');
    },
    [data.FirstName, businessName, storedUserId, businessLogo],
  );

  const renderInputToolbar = props => (
    <View style={styles.inputToolbarContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Enter your text"
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <View style={styles.iconContainer}>
          <Icons
            name="mic-outline"
            size={30}
            color="#00a0e9"
            style={styles.icon}
          />
          <Icon name="camera" size={26} color="#00a0e9" style={styles.icon} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onSend([{text, user: {_id: storedUserId}}])}
        style={styles.sendButton}>
        <Icons name="send-outline" size={30} color="#00a0e9" />
      </TouchableOpacity>
    </View>
  );

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#00a0e9',
          marginHorizontal: -40,
        },
        right: {
          backgroundColor: '#00a0e9',
        },
      }}
      textStyle={{
        left: {
          color: 'white',
        },
        right: {
          color: 'white',
        },
      }}
    />
  );

  const renderAvatar = () => {
    return (
      <View>
        <Image source={{uri: businessLogo}} style={styles.avatar} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: storedUserId}}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        // renderAvatar={renderAvatar}
        showUserAvatar={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputToolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 1,
    margin: 0,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: 'space-around',
  },
  textInput: {
    flex: 1,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
    padding: 8,
  },
  sendButton: {
    justifyContent: 'center',
    marginRight: 10,
    padding: 8,
  },
  bubbleWrapper: {
    left: {
      backgroundColor: '#00a0e9',
      marginVertical: 2,
    },
    right: {
      backgroundColor: '#00a0e9',
      marginVertical: 2,
    },
  },
  bubbleText: {
    left: {
      color: 'white',
    },
    right: {
      color: 'white',
    },
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Chat;
