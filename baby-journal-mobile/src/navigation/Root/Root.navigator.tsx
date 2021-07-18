import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatePresence } from 'moti';
import React from 'react';

import { useAuth } from '../../backend/Auth.backend';
import { AppUpdateBanner } from '../../components/AppUpdateBanner.component';
import { DebugButton } from '../../components/DebugButton.component';
import { useLoadFonts } from '../../hooks/useLoadFonts';
import { useAppStore } from '../../stores/App.store';
import { useDebugStore } from '../../stores/Debug.store';
import { stackStyleConfig } from '../../theme/NavigationStyleConfig';
import { LoadingScreen } from '../Loading.screen';
import { AppNavigator } from './App/App.navigator';
import { AppStackParamsList } from './App/App.routes';
import { DebugScreen } from './App/Settings/Debug.screen';
import { AuthNavigator, AuthStackParamsList } from './Auth/Auth.navigator';

export type RootStackParamsList = {
  Loading: undefined;
  Loaded: undefined;
};
const RootStack = createStackNavigator<RootStackParamsList>();

export type LoadedStackParamsList = {
  Auth: NavigatorScreenParams<AuthStackParamsList>;
  App: NavigatorScreenParams<AppStackParamsList>;
  Debug: undefined;
};
const LoadedStack = createStackNavigator<LoadedStackParamsList>();

export const RootNavigator: React.FC = () => {
  const fontsLoading = useLoadFonts();
  const [, authLoading] = useAuth();
  const { initAppUpdate, update } = useAppStore();
  const { safeDebugShowUpdateBanner } = useDebugStore();

  React.useEffect(() => {
    initAppUpdate();
  }, []);

  const loading = fontsLoading || authLoading;
  const showUpdateBanner = !loading && (update.downloaded || safeDebugShowUpdateBanner());
  return (
    <BottomSheetModalProvider>
      <RootStack.Navigator screenOptions={{ ...stackStyleConfig, headerShown: false }}>
        {loading ? (
          <RootStack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          <RootStack.Screen name="Loaded" component={LoadedNavigator} />
        )}
      </RootStack.Navigator>
      <AnimatePresence>{showUpdateBanner && <AppUpdateBanner />}</AnimatePresence>
    </BottomSheetModalProvider>
  );
};

const LoadedNavigator: React.FC = () => {
  const [user, authLoading] = useAuth();

  if (authLoading) {
    return null;
  }

  return (
    <>
      <LoadedStack.Navigator screenOptions={{ ...stackStyleConfig, headerShown: false }}>
        {user ? (
          <LoadedStack.Screen name="App" component={AppNavigator} />
        ) : (
          <LoadedStack.Screen name="Auth" component={AuthNavigator} />
        )}
        <LoadedStack.Screen name="Debug" component={DebugScreen} options={{ headerShown: true }} />
      </LoadedStack.Navigator>
      <DebugButton />
    </>
  );
};
