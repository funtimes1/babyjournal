import { RouteProp, useRoute } from '@react-navigation/native';

export type SettingsStackParamsList = {
  // Settings
  AccountInfo: undefined;
};

export type SettingsScreenRouteProp<ScreenName extends keyof SettingsStackParamsList> = RouteProp<
  SettingsStackParamsList,
  ScreenName
>;

export function useSettingsRoute<ScreenName extends keyof SettingsStackParamsList>() {
  return useRoute<SettingsScreenRouteProp<ScreenName>>();
}
