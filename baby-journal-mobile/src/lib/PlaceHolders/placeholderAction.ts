import { Alert } from 'react-native';

export const placeholderAction = (actionName: string, onDismiss?: () => void) => {
  return () => Alert.alert(actionName, undefined, onDismiss ? [{ onPress: onDismiss }] : undefined);
};
