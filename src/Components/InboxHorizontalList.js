import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {data} from '../Constant/InboxHorizontalListData';

const InboxHorizontalList = () => {
  const defaultClickedItem = data.length > 0 ? data[0].id : null;
  const [clickedItem, setClickedItem] = useState(defaultClickedItem);

  const renderItem = ({item}) => {
    const handleClick = () => {
      setClickedItem(item.id);
    };

    return (
      <TouchableOpacity onPress={handleClick}>
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                clickedItem === item.id ? '#00a0e9' : 'transparent',
            },
          ]}>
          <View style={styles.text_container}>
            <Text
              style={[
                styles.text,
                {color: clickedItem === item.id ? 'white' : '#00a0e9'},
              ]}>
              {`${item.name} (${item.total})`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{flexGrow: 1}}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00a0e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_container: {
    padding: 8,
  },
  text: {
    fontWeight: '500',
  },
});

export default InboxHorizontalList;
