import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectTime = ({dayName}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [selectStartTime, setSelectStartTime] = useState('Start');
  const [selectEndTime, setSelectEndTime] = useState('Stop');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const showStartTimePicker = () => {
    setIsStartTimePickerVisible(true);
  };

  const showEndTimePicker = () => {
    setIsEndTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsStartTimePickerVisible(false);
    setIsEndTimePickerVisible(false);
  };

  const handleStartTimeConfirm = time => {
    console.log('A start time has been picked: ', time);
    setSelectStartTime(formatTime(time));
    hideTimePicker();
  };

  const handleEndTimeConfirm = time => {
    console.log('An end time has been picked: ', time);
    setSelectEndTime(formatTime(time));
    hideTimePicker();
  };

  const formatTime = time => {
    let hours = time.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = ('0' + time.getMinutes()).slice(-2);
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.main_container}>
      <View style={{flexDirection: 'row', margin: 5}}>
        <View style={styles.switch_container}>
          <Switch
            trackColor={{false: '#6a778a', true: '#00a0e9'}}
            thumbColor={isEnabled ? 'white' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
          />
        </View>
        {isEnabled ? (
          <View style={{flex: 1, paddingLeft: 10}}>
            <View>
              <View style={{paddingTop: 5, paddingBottom: 8}}>
                <Text style={{fontWeight: '500'}}>{dayName}</Text>
              </View>

              <View
                style={{flexDirection: 'row', marginBottom: 8, paddingTop: 5}}>
                <TouchableOpacity onPress={showStartTimePicker}>
                  <View style={styles.time_container}>
                    <Text style={{padding: 8}}>{selectStartTime}</Text>
                  </View>
                </TouchableOpacity>

                <View style={{marginRight: 8}}>
                  <Text style={{padding: 8}}>to</Text>
                </View>

                <TouchableOpacity onPress={showEndTimePicker}>
                  <View style={styles.time_container}>
                    <Text style={{padding: 8}}>{selectEndTime}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{flex: 1, paddingLeft: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{paddingTop: 5, paddingBottom: 8}}>
                <Text style={{fontWeight: '500'}}>{dayName}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#f9f9fb',
                  padding: 8,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="moon-outline" size={18} />
                  <Text style={{paddingLeft: 8, textAlign: 'center'}}>
                    closed
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Start Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideTimePicker}
      />

      {/* End Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: '#c6cdd7',
  },
  switch_container: {
    alignItems: 'flex-start',
    padding: 5,
  },
  time_container: {
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#c6cdd7',
  },
});

export default SelectTime;
