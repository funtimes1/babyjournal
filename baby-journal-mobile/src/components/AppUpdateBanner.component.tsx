import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppStore } from '../stores/App.store';
import { PopDown } from './Animations/PopDown.component';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';
import { Spacer } from './Spacer.components';
import { OpenSans } from './Typography.components';

export const AppUpdateBanner: React.FC = () => {
  const { reload } = useAppStore();
  const { top: topSafeArea } = useSafeAreaInsets();
  return (
    <PopDown style={{ position: 'absolute', top: -20, left: 0, right: 0 }}>
      <Layout.Row
        shadow
        absolute={{ top: 0, left: 0, right: 0 }}
        style={{ paddingTop: topSafeArea + 20 }}
        bg="navScreenBackground"
      >
        <StatusBar style="dark" />
        <Layout.Row px="xs-12" py="2xs-10" center grow>
          <Layout.Column size={36} center>
            <OpenSans.Primary size="l-20">🚀</OpenSans.Primary>
          </Layout.Column>
          <Layout.Column>
            <OpenSans.Primary weight="bold" size="xs-12">
              NEW UPDATE AVAILABLE
            </OpenSans.Primary>
            <OpenSans.Primary size="xs-12">Update for the latest improvements.</OpenSans.Primary>
          </Layout.Column>
          <Spacer.Flex />
          {/* should not have to use this here, should be able to use button */}
          <TouchableOpacity onPress={reload}>
            <Layout.Row bg="primary" py="2xs-10" px="xs-12" radius="xl-28">
              <Icon name="sync" size={14} color="#fff" />
              <OpenSans.Inverse weight="regular" size="xs-12">
                {' '}
                Update
              </OpenSans.Inverse>
            </Layout.Row>
          </TouchableOpacity>
        </Layout.Row>
      </Layout.Row>
    </PopDown>
  );
};
