import {PermissionsAndroid} from 'react-native';

export const requestUserPermission = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
};
