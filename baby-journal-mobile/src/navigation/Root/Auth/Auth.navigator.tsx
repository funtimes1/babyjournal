import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Layout } from '../../../components/Layout.components';
import { stackStyleConfig } from '../../../theme/NavigationStyleConfig';
import { LoginScreen } from './Login.screen';
import { SignUpScreen } from './SignUp.screen';
import { WelcomeScreen } from './Welcome.screen';

export type AuthStackParamsList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamsList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Layout.KeyboardAvoiding>
      <AuthStack.Navigator screenOptions={{ ...stackStyleConfig }}>
        <AuthStack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      </AuthStack.Navigator>
    </Layout.KeyboardAvoiding>
  );
};
