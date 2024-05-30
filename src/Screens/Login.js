import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginWithEmail = () => {
    if (!email || !password) {
      ToastAndroid.show(
        'Email and Password fields cannot be empty!',
        ToastAndroid.SHORT,
      );
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const id = res.user.uid;
        console.log('id ==> ', id);
        ToastAndroid.show('User signed in successfully!', ToastAndroid.SHORT);
        AsyncStorage.setItem('UserId', id).then(
          console.log('Successfully set UserId in AsyncStorage'),
        );
        AsyncStorage.setItem('sessionToken', JSON.stringify(true));
        navigation.navigate('BottomTabNavigator');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show(
            'User not registered. Please sign up first.',
            ToastAndroid.SHORT,
          );
          navigation.navigate('Register');
        } else {
          ToastAndroid.show('Invalid email or password!', ToastAndroid.SHORT);
          console.error(error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
                Enter your email address
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 15}}>
                Enter your email address to sign in your account
              </Text>
            </View>

            <View style={{marginTop: 25}}>
              <View>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Email Address
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Textinput
                  value={email}
                  onChangeText={txt => setEmail(txt)}
                  secureTextEntry={false}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Password
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Textinput
                  value={password}
                  onChangeText={txt => setPassword(txt)}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={LoginWithEmail}>
              <Button name="Sign in" backgroundColor="#01a0e9" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Button name="Register" backgroundColor="#01a0e9" color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
