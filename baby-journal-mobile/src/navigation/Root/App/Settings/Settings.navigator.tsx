import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Layout } from '../../../../components/Layout.components';

import { stackStyleConfig } from '../../../../theme/NavigationStyleConfig';
import { AccountInfoScreen } from './AccountInfo.screen';
import { MenuScreen } from './Menu.screen';
import { SettingsStackParamsList } from './Settings.routes';

const SettingsStack = createStackNavigator<SettingsStackParamsList>();

export const SettingsNavigator: React.FC = () => {
  return (
    <Layout.KeyboardAvoiding>
      <SettingsStack.Navigator screenOptions={{ ...stackStyleConfig }}>
        <SettingsStack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
        <SettingsStack.Screen
          name="AccountInfo"
          component={AccountInfoScreen}
          options={{ title: 'Account Info' }}
        />
      </SettingsStack.Navigator>
    </Layout.KeyboardAvoiding>
  );
};
