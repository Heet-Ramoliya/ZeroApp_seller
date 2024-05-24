import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

const SwitchComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
      <Switch
        trackColor={{false: '#6a778a', true: '#00a0e9'}}
        thumbColor={isEnabled ? 'white' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
      />
    </View>
  );
};

export default SwitchComponent;
