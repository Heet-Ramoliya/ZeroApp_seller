import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const reauthenticate = currentPassword => {
    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const onChangePasswordPress = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    if (newPassword === currentPassword) {
      Alert.alert(
        'Error',
        'New password must be different from the current password.',
      );
      return;
    }

    reauthenticate(currentPassword)
      .then(() => {
        const user = auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert('Success', 'Password changed successfully!', [
              {
                text: 'OK',
                onPress: () => {
                  AsyncStorage.removeItem('sessionToken').then(() => {
                    console.log('Successfully removed sessionToken!');
                  });
                  AsyncStorage.removeItem('UserId').then(() => {
                    console.log('Successfully removed UserId!');
                  });
                  navigation.replace('SplashScreen');
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                },
              },
            ]);
          })
          .catch(error => {
            switch (error.code) {
              case 'auth/weak-password':
                Alert.alert(
                  'Error',
                  'The new password is too weak. Please choose a stronger password.',
                );
                break;
              case 'auth/wrong-password':
                Alert.alert('Error', 'The current password is incorrect.');
                break;
              default:
                Alert.alert('Error', error.message);
                break;
            }
          });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
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
            <View style={{marginTop: 25}}>
              <View>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Current Password
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Textinput
                  value={currentPassword}
                  onChangeText={txt => setCurrentPassword(txt)}
                  secureTextEntry={true}
                  placeholder="Enter current password"
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  New Password
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Textinput
                  value={newPassword}
                  onChangeText={txt => setNewPassword(txt)}
                  secureTextEntry={true}
                  placeholder="Enter new password"
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Confirm Password
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Textinput
                  value={confirmPassword}
                  onChangeText={txt => setConfirmPassword(txt)}
                  secureTextEntry={true}
                  placeholder="Enter confirm password"
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={onChangePasswordPress}>
              <Button name="Complete" backgroundColor="#01a0e9" color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
