import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Icon, IconName } from '../../../../components/Icons/Icon';
import { bottomTabStyleConfig } from '../../../../theme/NavigationStyleConfig';
import { MenuScreen } from './Settings/Menu.screen';
import { DashboardScreen } from './Summary/Dashboard.screen';

export type AppTabsParamsList = {
  Summary: undefined;
  Transactions: undefined;
  Mileages: undefined;
  Reports: undefined;
  Menu: undefined;
};

const AppTabs = createBottomTabNavigator<AppTabsParamsList>();

export const AppTabsNavigator: React.FC = () => {
  return (
    <AppTabs.Navigator screenOptions={{ ...bottomTabStyleConfig }}>
      <AppTabs.Screen
        name="Summary"
        options={{
          tabBarIcon: (props) => (
            <Icon name={`pie-chart${props.focused ? '' : '-outline'}` as IconName} {...props} />
          ),
        }}
        component={DashboardScreen}
      />
      <AppTabs.Screen
        name="Menu"
        options={{
          tabBarIcon: (props) => (
            <Icon name={`settings${props.focused ? '' : '-outline'}` as IconName} {...props} />
          ),
        }}
        component={MenuScreen}
      />
    </AppTabs.Navigator>
  );
};
