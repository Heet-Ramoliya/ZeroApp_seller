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

const Login = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{marginHorizontal: 20, marginTop: 10, flex: 1}}>
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
              />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BottomTabNavigator');
            }}>
            <Button name="Sign in" backgroundColor="#01a0e9" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Button name="Register" backgroundColor="#01a0e9" color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
