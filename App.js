import React, {useEffect} from 'react';
import StackNavigator from './src/Navigations/StackNavigator';
import {requestUserPermission} from './src/Notification/firebase.js';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return <StackNavigator />;
};

export default App;
