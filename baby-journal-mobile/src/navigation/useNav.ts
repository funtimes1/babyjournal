import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AppStackParamsList } from './Root/App/App.routes';
import { OnboardingStackParamsList } from './Root/App/Onboarding/Onboarding.navigator';
import { AuthStackParamsList } from './Root/Auth/Auth.navigator';
import { SettingsStackParamsList } from './Root/App/Settings/Settings.routes';
import { LoadedStackParamsList, RootStackParamsList } from './Root/Root.navigator';

type AllScreens = RootStackParamsList &
  LoadedStackParamsList &
  AuthStackParamsList &
  AppStackParamsList &
  OnboardingStackParamsList &
  SettingsStackParamsList;

export type AllScreenKeys = keyof AllScreens;

export type RootStackScreenNavProp<ScreenName extends AllScreenKeys> = StackNavigationProp<
  AllScreens,
  ScreenName
>;

export function useNav<ScreenName extends AllScreenKeys>() {
  return useNavigation<RootStackScreenNavProp<ScreenName>>();
}
