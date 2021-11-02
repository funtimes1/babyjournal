import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import { theme } from './theme';

export const headerStyles: StackHeaderOptions = {
  headerStyle: {
    backgroundColor: theme.colors.navBackground,
    borderBottomColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTintColor: theme.colors.navTint,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: theme.fonts['open-sans'].bold,
  },
} as const;

export const inverseHeaderStyles: StackHeaderOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
    borderBottomColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTintColor: theme.colors.inverse,
} as const;

export const stackStyleConfig: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: theme.colors.navScreenBackground,
  },
  ...headerStyles,
};

const tabBarStyles = {
  tabBarActiveTintColor: theme.colors.navTint,
  tabBarInactiveTintColor: theme.colors.navInactiveTint,
  tabBarStyle: {
    backgroundColor: theme.colors.navBackground,
    borderBottomColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
} as const;

export const bottomTabStyleConfig: BottomTabNavigationOptions = {
  ...tabBarStyles,
  tabBarHideOnKeyboard: true,
  ...headerStyles,
};

export const topTabStyleConfig: MaterialTopTabNavigationOptions = {
  ...tabBarStyles,
  tabBarIndicatorStyle: { backgroundColor: theme.colors.navTint },
  ...headerStyles,
};
