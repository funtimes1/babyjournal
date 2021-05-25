import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaceHolderScreen } from '../../../lib/PlaceHolders/Placeholder.screen';
import { stackStyleConfig } from '../../../theme/NavigationStyleConfig';
import { AppStackParamsList } from './App.routes';
import { DashboardScreen } from './Dashboard.screen';
import { SettingsNavigator } from './Settings/Settings.navigator';

const AppStack = createStackNavigator<AppStackParamsList>();

export const AppNavigator: React.FC = () => {
  const [showOnboarding] = React.useState(false);
  return (
    <AppStack.Navigator screenOptions={{ ...stackStyleConfig }}>
      {showOnboarding ? (
        <AppStack.Screen name="Onboarding" component={PlaceHolderScreen} />
      ) : (
        <>
          <AppStack.Screen
            name="Journal"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen name="Modal" component={PlaceHolderScreen} />
          {/* Settings Tab */}
          <AppStack.Screen
            name="Settings"
            component={SettingsNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}
    </AppStack.Navigator>
  );
};
