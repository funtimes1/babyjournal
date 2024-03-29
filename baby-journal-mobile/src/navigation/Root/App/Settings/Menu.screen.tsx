import React from 'react';

import { ActionRow } from '../../../../components/ActionRow.component';
import { Layout } from '../../../../components/Layout.components';
import { Separator } from '../../../../components/Separator.components';
import { useNav } from '../../../useNav';

export const MenuScreen: React.FC = () => {
  const { navigate } = useNav<'Menu'>();
  return (
    <Layout.Column grow bg="navScreenBackground">
      <Layout.Scroll>
        <ActionRow
          content="Account Info"
          icon="person-outline"
          onPress={() => navigate('Settings', { screen: 'AccountInfo' })}
        />
        <Separator.Horizontal />
        <ActionRow content="Debug" icon="bug-outline" onPress={() => navigate('Debug')} />
        <Separator.Horizontal />
      </Layout.Scroll>
    </Layout.Column>
  );
};
