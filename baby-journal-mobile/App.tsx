import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/theme/theme';
import { RootNavigator } from './src/navigation/Root/Root.navigator';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { useDebugStore } from './src/stores/Debug.store';
import { useHandleUpdates } from './src/hooks/useHandleUpdates';
import { enableScreens } from 'react-native-screens';

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
