// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
// import {getNewToken} from './FirebaseAdmin';

// export const configurePushNotifications = () => {
//   PushNotification.createChannel({
//     channelId: 'default-channel-id',
//     channelName: 'Default Channel',
//     channelDescription: 'A default channel for push notifications',
//   });

//   messaging().onMessage(async remoteMessage => {
//     console.log('A new FCM message arrived!', remoteMessage);
//     PushNotification.localNotification({
//       channelId: 'default-channel-id',
//       title: remoteMessage.notification?.title,
//       message: remoteMessage.notification?.body,
//     });
//   });
// };

// export const sendPushNotification = async () => {
//   let token = await messaging().getToken();
//   console.log('Firebase Token:', token);

//   const requestPayload = {
//     message: {
//       token: token,
//       data: {},
//       notification: {
//         body: 'Successfully added item!',
//         title: 'FCM Message',
//       },
//     },
//   };

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer your-oauth2-token',
//   };

//   let response = await fetch(
//     'https://fcm.googleapis.com/v1/projects/your-project-id/messages:send',
//     {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(requestPayload),
//     },
//   );

//   if (!response.ok && response.status === 401) {
//     console.error('Token expired. Regenerating...');
//     const newToken = await getNewToken();
//     headers.Authorization = `Bearer ${newToken}`;

//     response = await fetch(
//       'https://fcm.googleapis.com/v1/projects/zeroapp-66e9a/messages:send',
//       {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(requestPayload),
//       },
//     );
//   }

//   if (response.ok) {
//     console.log('Push notification sent successfully.');
//   } else {
//     console.error(
//       'Failed to send push notification:',
//       response.status,
//       response.statusText,
//     );
//   }
// };

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

// export const configurePushNotifications = () => {
//   PushNotification.createChannel({
//     channelId: 'default-channel-id',
//     channelName: 'Default Channel',
//     channelDescription: 'A default channel for push notifications',
//   });

//   messaging().onMessage(async remoteMessage => {
//     console.log('A new FCM message arrived!', remoteMessage);
//     PushNotification.localNotification({
//       channelId: 'default-channel-id',
//       title: remoteMessage.notification?.title,
//       message: remoteMessage.notification?.body,
//     });
//   });
// };

// export const sendPushNotification = async () => {
//   const token = await messaging().getToken();
//   console.log('Firebase Token:', token);

//   const requestPayload = {
//     message: {
//       token: token,
//       data: {},
//       notification: {
//         body: 'Successfully add item!!',
//         title: 'FCM Message',
//       },
//     },
//   };

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization:
//       'Bearer ya29.a0AXooCguZMNy62tQUt_o8kq90MR6KujUcgNWoP71pSJN-vdbQ1DuYBk8Nsy1mFLOznB498JScZy76bkUY2BA4exvUcWD4EjzsAa8cAhK3KPSA2DUobC18yMj2dfJlwaPT722NX-GhXSziqEr6IXWricd3lvq4qj-RFJbjaCgYKAUQSARISFQHGX2MifaqVbUuQaHpy0pS5oWt_LQ0171',
//   };

//   const response = await fetch(
//     'https://fcm.googleapis.com/v1/projects/zeroapp-66e9a/messages:send',
//     {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(requestPayload),
//     },
//   );

//   if (response.ok) {
//     console.log('Push notification sent successfully.');
//   } else {
//     console.error(
//       'Failed to send push notification:',
//       response.status,
//       response.statusText,
//     );
//   }
// };

export const sendPushNotification = async () => {
  try {
    const token = await messaging().getToken();
    if (!token) {
      throw new Error('Failed to retrieve FCM token.');
    }

    const notificationPayload = {
      message: {
        token,
        data: {},
        notification: {
          title: 'Title of your Notification',
          body: 'Body of your Notification',
        },
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ya29.a0AXooCgsRIrOyE61XNCnTm31Z8-Sz0PKYNuX6kjzDM_YwgpICQHZcmldA1ZMVBTmJ5rN0Iun_5MEdfLgLs0N7fTOt_k0kObWxUqaoOzlMxzLsrKMlRdEZ1OcN0_IROtsE49KHAVfROSLVUlgZydKcK-KDbcz51AnXTjf3aCgYKAaASARISFQHGX2MizFrduCkqrjHe_B6fR4k4nw0171
      `,
    };

    const response = await fetch(
      'https://fcm.googleapis.com/v1/projects/zeroapp-66e9a/messages:send',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(notificationPayload),
      },
    );

    // Checking if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to send push notification: ${response.status} ${response.statusText}`,
      );
    }

    console.log('Push notification sent successfully.');

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};
