import {View, Text} from 'react-native';
import React from 'react';
import InboxHorizontalList from '../Components/InboxHorizontalList';
import InboxVerticalList from '../Components/InboxVerticalList';

const Inbox = () => {
  return (
    <View>
      <View style={{marginLeft: 10, marginTop: 10, marginEnd: 10}}>
        <InboxHorizontalList />
      </View>
      <View style={{marginTop: 10}}>
        <InboxVerticalList />
      </View>
    </View>
  );
};

export default Inbox;
