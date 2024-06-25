import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export const requestUserPermission = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  GetFCMToken();
};

export const GetFCMToken = async () => {
  try {
    const fcmtoken = await messaging().getToken();
    if (fcmtoken) {
      console.log('New Token ==>', fcmtoken);
    }
  } catch (error) {
    console.log('error in fcmtoken ==>', error);
  }
};


