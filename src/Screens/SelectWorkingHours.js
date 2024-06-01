import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Progressbar from '../Components/Progressbar';
import SelectTime from '../Components/SelectTime';
import Button from '../Components/Button';
import {db} from '../Firebase/Config';
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectWorkingHours = ({navigation, route}) => {
  const {mode} = route.params;
  const [workingHours, setWorkingHours] = useState({
    Sunday: {start: 'closed', end: 'closed'},
    Monday: {start: 'closed', end: 'closed'},
    Tuesday: {start: 'closed', end: 'closed'},
    Wednesday: {start: 'closed', end: 'closed'},
    Thursday: {start: 'closed', end: 'closed'},
    Friday: {start: 'closed', end: 'closed'},
    Saturday: {start: 'closed', end: 'closed'},
  });
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const id = await AsyncStorage.getItem('UserId');
        if (id !== null) {
          setUserId(id);
          if (mode === 'update') {
            await fetchWorkingHours(id);
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
        setLoading(false);
      }
    };
    getUserIdFromStorage();
  }, []);

  const fetchWorkingHours = async userId => {
    try {
      const q = query(
        collection(db, 'Seller_BusinessWorkingHours'),
        where('UserId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const workingHoursData = querySnapshot.docs[0].data();
        setWorkingHours(workingHoursData.workingHours);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching working hours:', error);
      setLoading(false);
    }
  };

  const updateWorkingHours = (day, startTime, endTime) => {
    setWorkingHours(prevHours => ({
      ...prevHours,
      [day]: {start: startTime, end: endTime},
    }));
  };

  const logSelectedTime = (day, startTime, endTime) => {
    updateWorkingHours(day, startTime, endTime);
    console.log(
      `Time selected for ${day}: Start - ${startTime}, End - ${endTime}`,
    );
  };

  const checkStatus = async () => {
    try {
      const docData = {
        workingHours: workingHours,
        UserId: userId,
      };

      if (mode === 'update') {
        const q = query(
          collection(db, 'Seller_BusinessWorkingHours'),
          where('UserId', '==', userId),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, docData);
          console.log('Working hours updated successfully!');
          navigation.navigate('AllDone', {mode: mode});
        } else {
          console.log('No matching document found');
        }
      } else {
        await addDoc(collection(db, 'Seller_BusinessWorkingHours'), docData);
        console.log('Working hours inserted successfully!');
        navigation.navigate('AllDone', {mode: mode});
      }
    } catch (error) {
      console.error('Error handling working hours:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <View style={{marginTop: 25, marginHorizontal: 20}}>
          <Progressbar value={1} />
        </View>
        <View style={{marginHorizontal: 35}}>
          <View style={styles.text_Container}>
            <Text style={styles.heading}>Select working hours</Text>
            <Text style={styles.description}>
              Set up weekly working schedule for your business.
            </Text>
          </View>
          <View style={{marginTop: 15}}>
            {[
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ].map(day => (
              <SelectTime
                key={day}
                dayName={day}
                logTime={logSelectedTime}
                start={workingHours[day].start}
                end={workingHours[day].end}
              />
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={checkStatus}>
        <View style={{marginTop: 10, marginBottom: 10}}>
          <View>
            <Button name="Continue" backgroundColor="#01a0e9" color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text_Container: {
    marginTop: 35,
  },
  heading: {
    fontSize: 22,
    color: 'black',
    marginBottom: 10,
  },
  description: {
    textAlign: 'justify',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectWorkingHours;
