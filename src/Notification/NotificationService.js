import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export const configurePushNotifications = () => {
  PushNotification.createChannel({
    channelId: 'default-channel-id',
    channelName: 'Default Channel',
    channelDescription: 'A default channel for push notifications',
  });

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: remoteMessage.notification?.title,
      message: remoteMessage.notification?.body,
    });
  });
};

export const sendPushNotification = async () => {
  const token = await messaging().getToken();
  console.log('Firebase Token:', token);

  const requestPayload = {
    message: {
      token: token,
      data: {},
      notification: {
        body: 'This is an FCM notification message!',
        title: 'FCM Message',
      },
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ya29.a0AXooCgs5bLNL_SO8CkLMLRiSpvcnihtelggtVpbca6caB7-EHiwzEnOOtBmnXgT3FXicM_xIZqwL5xdeaRYA8Ws1Zbwwr-wD8pwFuyYwBehWxXFOFZdmyvOIgdkZr6lT8BlAU35s5dxLPT_obH_6GotsxzIpsgwpgbp3aCgYKAQISARISFQHGX2MiMaAblvdCN9genNE506GtzA0171',
  };

  const response = await fetch(
    'https://fcm.googleapis.com/v1/projects/zeroapp-66e9a/messages:send',
    {
      method: 'POST',
      headers,
      body: JSON.stringify(requestPayload),
    },
  );

  if (response.ok) {
    console.log('Push notification sent successfully.');
  } else {
    console.error(
      'Failed to send push notification:',
      response.status,
      response.statusText,
    );
  }
};
