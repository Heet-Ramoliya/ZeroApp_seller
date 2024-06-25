import React, {useEffect} from 'react';
import StackNavigator from './src/Navigations/StackNavigator';
import {
  requestUserPermission,
  GetFCMToken,
} from './src/Notification/firebase.js';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    GetFCMToken();
  }, []);

  return <StackNavigator />;
};

export default App;
