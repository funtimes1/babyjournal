import { Layout } from '@easy-expense/ui/native';
import React from 'react';
// import EmojiSelector from 'react-native-emoji-selector';

import { EmojiPicker } from '../../../../../components/Forms/Fields/Selection/EmojiPicker.component';
// import { logout } from '@easy-expense/auth-client';
// import { PlaceHolderScreen } from '../../../../../lib/PlaceHolders/Placeholder.screen';

export const DashboardScreen: React.FC = () => {
  return (
    <Layout.Column grow bg="navScreenBackground">
      <EmojiPicker onEmojiSelected={(emoji) => alert(emoji)} />
    </Layout.Column>
  );
};
