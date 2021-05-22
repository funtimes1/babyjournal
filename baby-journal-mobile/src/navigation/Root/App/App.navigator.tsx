import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaceHolderScreen } from '../../../lib/PlaceHolders/Placeholder.screen';
import { stackStyleConfig } from '../../../theme/NavigationStyleConfig';
import { AppStackParamsList } from './App.routes';
import { AppTabsNavigator } from './AppTabs/AppTabs.navigator';
import { MileageNavigator } from './Mileage/Mileage.navigator';
import { ReportNavigator } from './Report/Report.navigator';
import { SettingsNavigator } from './Settings/Settings.navigator';
import { ExpenseNavigator } from './Transaction/Expense.navigator';

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
            name="AppTabs"
            component={AppTabsNavigator}
            options={{ headerShown: false }}
          />
          <AppStack.Screen name="Modal" component={PlaceHolderScreen} />
          {/* Expenses Tab */}
          <AppStack.Screen
            name="Expense"
            component={ExpenseNavigator}
            options={{ headerShown: false }}
          />
          {/* Mileage Tab */}
          <AppStack.Screen
            name="Mileage"
            component={MileageNavigator}
            options={{ headerShown: false }}
          />
          {/* Reports Tab */}
          <AppStack.Screen
            name="Report"
            component={ReportNavigator}
            options={{ headerShown: false }}
          />
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
