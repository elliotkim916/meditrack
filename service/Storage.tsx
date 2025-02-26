import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { User } from 'firebase/auth';

export const setLocalStorage = async (key: string, value: User) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = async (key: string) => {
  const result = await AsyncStorage.getItem(key);

  if (result) {
    return JSON.parse(result);
  }
};

export const removeLocalStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
  router.push('/login');
};
