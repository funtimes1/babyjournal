import { Platform } from 'react-native';

export function platformValue<T>(ios: T, android: T) {
  return Platform.OS === 'ios' ? ios : android;
}
