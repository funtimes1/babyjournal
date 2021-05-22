import React from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { useAppStore } from '../stores/App.store';

export function useHandleUpdates() {
  const { checkForAppUpdate } = useAppStore();
  // listen for app coming into forground
  const [appState, setAppState] = React.useState(AppState.currentState);
  // handle daily recap logic
  React.useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.info('App has come to the foreground!');
        console.info('Checking for updates');
        checkForAppUpdate();
      }
      setAppState(nextAppState);
    };
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [appState]);
}
