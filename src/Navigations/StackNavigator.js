import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Dashboard from '../Screens/Dashboard';
import BottomTabNavigator from './BottomTabNavigator';
import AllAds from '../Screens/AllAds';
import {TopTabNavigator} from './TopTabNavigator';
import Profile from '../Screens/Profile';
import BusinessProfile from '../Screens/BusinessProfile';
import BusinessInfo from '../Screens/BusinessInfo';
import BusinessDescription from '../Screens/BusinessDescription';
import BusinesssShowRoomLocation from '../Screens/BusinesssShowRoomLocation';
import SelectWorkingHours from '../Screens/SelectWorkingHours';
import AllDone from '../Screens/AllDone';
import SystemPermission from '../Screens/SystemPermission';
import AddCars from '../Screens/AddCars';
import ChangePassword from '../Screens/ChangePassword';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            title: 'Sign in',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TopTabNavigator"
          component={TopTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllAds"
          component={AllAds}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BusinessProfile"
          component={BusinessProfile}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BusinessInfo"
          component={BusinessInfo}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BusinessDescription"
          component={BusinessDescription}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BusinesssShowRoomLocation"
          component={BusinesssShowRoomLocation}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: 'ShowRoomLocation',
          }}
        />
        <Stack.Screen
          name="SelectWorkingHours"
          component={SelectWorkingHours}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AllDone"
          component={AllDone}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="SystemPermission"
          component={SystemPermission}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AddCars"
          component={AddCars}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
