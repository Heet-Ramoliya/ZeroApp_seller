import messaging from '@react-native-firebase/messaging';

export const sendPushNotifications = async () => {
  let token = await messaging().getToken();
  console.log('Firebase Token:', token);

  const requestPayload = {
    message: {
      token: token,
      data: {},
      notification: {
        body: 'Successfully added item!',
        title: 'FCM Message',
      },
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ya29.a0AXooCgsKTDWNELQ9YG1GJk2PbY7cie2hM4cXrqgCaBzux-tk-K2mZrcidfjYmbHrZVVdhOL4WlP47JbMO2fT3CtBZe-Iy2HnEOWpNjWuEwgYXd56uu_FbiJrWvgbEfxNebxsofBE6uLgU7-f9to3VOp4EYXXWVvGvunYaCgYKAbYSARISFQHGX2MiK8pTWFovSNoL93lUm_jWaw0171',
  };

  let response = await fetch(
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
