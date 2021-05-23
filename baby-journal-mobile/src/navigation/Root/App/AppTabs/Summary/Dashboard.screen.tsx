import React from 'react';
import { Layout } from '../../../../../components/Layout.components';
import { OpenSans } from '../../../../../components/Typography.components';
// import EmojiSelector from 'react-native-emoji-selector';

// import { logout } from '@easy-expense/auth-client';
// import { PlaceHolderScreen } from '../../../../../lib/PlaceHolders/Placeholder.screen';

export const DashboardScreen: React.FC = () => {
  return (
    <Layout.Column grow bg="navScreenBackground">
      <OpenSans.Primary>Dashboard</OpenSans.Primary>
    </Layout.Column>
  );
};
