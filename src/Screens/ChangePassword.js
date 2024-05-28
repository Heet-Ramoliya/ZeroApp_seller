import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Textinput from '../Components/Textinput';
import Button from '../Components/Button';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
                  secureTextEntry={false}
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
                  secureTextEntry={false}
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
                  secureTextEntry={false}
                  placeholder="Enter Confirm password"
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Button name="Complete" backgroundColor="#01a0e9" color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
