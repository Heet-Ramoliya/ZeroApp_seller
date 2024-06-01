import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegister = () => {
    if (!email || !password) {
      ToastAndroid.show(
        'Email and password cannot be empty!',
        ToastAndroid.SHORT,
      );
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('BusinessProfile', {mode: 'register'});
        ToastAndroid.show('User signed up successfully', ToastAndroid.SHORT);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            ToastAndroid.show(
              'That email address is already in use!',
              ToastAndroid.SHORT,
            );
            break;
          case 'auth/invalid-email':
            ToastAndroid.show(
              'That email address is invalid!',
              ToastAndroid.SHORT,
            );
            break;
          default:
            ToastAndroid.show(
              'An error occurred. Please try again later.',
              ToastAndroid.SHORT,
            );
            console.error(error);
        }
      });
  };

  return (
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
            <Textinput value={email} onChangeText={txt => setEmail(txt)} />
          </View>
          <View>
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
      <View style={{marginBottom: 20}}>
        <TouchableOpacity onPress={emailRegister}>
          <Button name="Register" backgroundColor="#01a0e9" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
