import React, {useEffect} from 'react';
import StackNavigator from './src/Navigations/StackNavigator';
import {
  requestUserPermission,
  getFcmToken,
  notificationListener,
} from './src/Notification/firebase.js';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    notificationListener();
  }, []);

  return <StackNavigator />;
};

export default App;
