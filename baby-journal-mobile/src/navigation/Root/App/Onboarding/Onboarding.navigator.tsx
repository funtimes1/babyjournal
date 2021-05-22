import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaceHolderScreen } from '../../../../lib/PlaceHolders/Placeholder.screen';
import { stackStyleConfig } from '../../../../theme/NavigationStyleConfig';

export type OnboardingStackParamsList = {
  SetupSettings: undefined;
  SetupTeam: undefined;
  TryFeatures: undefined;
};

const OnboardingStack = createStackNavigator<OnboardingStackParamsList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ ...stackStyleConfig }}>
      <OnboardingStack.Screen name="SetupSettings" component={PlaceHolderScreen} />
      <OnboardingStack.Screen name="SetupTeam" component={PlaceHolderScreen} />
      <OnboardingStack.Screen name="TryFeatures" component={PlaceHolderScreen} />
    </OnboardingStack.Navigator>
  );
};
