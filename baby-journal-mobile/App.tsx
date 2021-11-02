import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components';

import { useHandleUpdates } from './src/hooks/useHandleUpdates';
import { RootNavigator } from './src/navigation/Root/Root.navigator';
import { useDebugStore } from './src/stores/Debug.store';
import { theme } from './src/theme/theme';

enableScreens();

// Ignore log notification by message:
LogBox.ignoreLogs([
  // we implicitly access these when printing debug info
  'Constants.installationId has been deprecated in favor of generating and storing your own ID.',
  'Constants.deviceId has been deprecated in favor of generating and storing your own ID.',
  'Constants.linkingUrl has been renamed to Constants.linkingUri. Consider using the Linking API directly.',
]);

export default function App() {
  const { safeDebugBorders } = useDebugStore();
  useHandleUpdates();
  return (
    <ThemeProvider theme={{ ...theme, debugBorders: safeDebugBorders() }}>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
