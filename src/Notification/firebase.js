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

export const PushNotification = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open for background state ==>',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'notification caused app to open from quit state ==>',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    remoteMessage.notification,
      console.log('notification on forground state....', remoteMessage);
  });
};
