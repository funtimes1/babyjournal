import { useNavigation } from '@react-navigation/native';

export function useGoBack() {
  const { goBack, canGoBack } = useNavigation();
  const safeGoBack = () => {
    if (canGoBack()) {
      goBack();
    }
  };
  return safeGoBack;
}
