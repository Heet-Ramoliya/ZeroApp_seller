import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {CarInboxData} from '../Constant/InboxVerticalListData';
import Separator from './Separator';

const InboxVerticalList = () => {
  const renderItem = ({item, index}) => (
    <View style={{marginBottom: index !== CarInboxData.length - 1 ? 10 : 0}}>
      <View>
        <View style={styles.main_container}>
          <View style={styles.img_container}>
            <Image
              source={{uri: item.Image}}
              style={styles.img}
              resizeMode={'stretch'}
            />
          </View>
          <View style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                {item.CarCompany}
              </Text>
              <Text style={{fontSize: 13, color: 'gray', marginTop: 4}}>
                {item.messageTime}
              </Text>
            </View>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              {item.CarName}
            </Text>
            <Text numberOfLines={1} style={{flex: 1}}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
      {index !== CarInboxData.length - 1 && <Separator />}
    </View>
  );
  return (
    <FlatList
      data={CarInboxData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{flexGrow: 1}}
    />
  );
};

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    padding: 15,
  },
  img_container: {
    marginRight: 8,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

export default InboxVerticalList;
