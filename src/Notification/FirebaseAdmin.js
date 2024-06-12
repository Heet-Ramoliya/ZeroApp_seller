// const admin = require('firebase-admin');
// const serviceAccount = require('../../android/serviceAccountKey.json');
// import messaging from '@react-native-firebase/messaging';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export const getNewToken = async () => {
//   const token = await messaging().getToken();
//   const registrationToken = token;
//   const message = {
//     notification: {
//       title: 'New Token',
//       body: 'Your new FCM token is here',
//     },
//     token: registrationToken,
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     console.log('Successfully sent message:', response);
//     return response;
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };
