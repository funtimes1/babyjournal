import { NavigatorScreenParams, RouteProp, useRoute } from '@react-navigation/native';

import { SettingsStackParamsList } from './Settings/Settings.routes';

export type AppStackParamsList = {
  // Root level
  Journal: undefined;
  Modal: undefined;
  Onboarding: undefined;
  // Settings
  Settings: NavigatorScreenParams<SettingsStackParamsList>;
  // Debug: undefined;
};

export type AppScreenRouteProp<ScreenName extends keyof AppStackParamsList> = RouteProp<
  AppStackParamsList,
  ScreenName
>;

export function useAppRoute<ScreenName extends keyof AppStackParamsList>() {
  return useRoute<AppScreenRouteProp<ScreenName>>();
}
