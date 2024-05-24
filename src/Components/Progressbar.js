import {View, Text} from 'react-native';
import React from 'react';
import ProgressBar from 'react-native-progress-bar-horizontal';

const Progressbar = ({value}) => {
  return (
    <View>
      <ProgressBar
        progress={value}
        fillColor="#00a0e9"
        unfilledColor="#d4eefa"
        height={5}
        duration={100}
        borderWidth={0}
      />
    </View>
  );
};

export default Progressbar;
