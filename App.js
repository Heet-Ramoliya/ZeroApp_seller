import React, {useEffect} from 'react';
import StackNavigator from './src/Navigations/StackNavigator';
import {
  requestUserPermission,
  GetFCMToken,
  PushNotification,
} from './src/Notification/firebase.js';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    GetFCMToken();
    PushNotification();
  }, []);

  return <StackNavigator />;
};

export default App;
