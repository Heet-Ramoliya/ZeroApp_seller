// import {View, Text} from 'react-native';
// import React from 'react';
// import InboxHorizontalList from '../Components/InboxHorizontalList';
// import InboxVerticalList from '../Components/InboxVerticalList';

// const Inbox = () => {
//   return (
//     <View>
//       <View style={{marginLeft: 10, marginTop: 10, marginEnd: 10}}>
//         <InboxHorizontalList />
//       </View>
//       <View style={{marginTop: 10}}>
//         <InboxVerticalList />
//       </View>
//     </View>
//   );
// };

// export default Inbox;

import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, onValue, push, set} from 'firebase/database';
import {RealTimeDatabase} from '../Firebase/Config';
import moment from 'moment';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [storedUserId, setStoredUserId] = useState('');

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

    const chatsRef = ref(RealTimeDatabase, 'Chats');
    const unsubscribe = onValue(chatsRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map(key => ({
          _id: key,
          createdAt: new Date(data[key].createdAt),
          msgType: data[key].msgType,
          text: data[key].text,
          user: data[key].user,
        }));
        setMessages(messagesArray.reverse());
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async () => {
    if (!text.trim()) {
      return;
    }

    const newMessage = {
      _id: messages.length + 1,
      text: text.trim(),
      createdAt: new Date(),
      user: {
        _id: storedUserId,
      },
    };

    setMessages(prevMessages => GiftedChat.append(prevMessages, [newMessage]));
    setText('');

    try {
      const timestamp = moment().valueOf();
      const newMessageRef = push(ref(RealTimeDatabase, 'Chats'));
      const dbMessage = {
        createdAt: timestamp,
        user: newMessage.user,
        text: newMessage.text,
        msgType: 'text',
      };

      await set(newMessageRef, dbMessage);
    } catch (error) {
      console.error('Error sending message to database: ', error);
    }
  }, [text, messages, storedUserId]);

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
      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
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
          marginHorizontal: -25,
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

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={() => onSend()}
        user={{_id: storedUserId}}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
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
});

export default Inbox;
