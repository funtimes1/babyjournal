import React from 'react';
import { useUser } from '../../../../backend/Auth.backend';

import { DebugInfoContainer } from '../../../../components/DebugInfoContainer.component';
import { Layout } from '../../../../components/Layout.components';

export const AccountInfoScreen: React.FC = () => {
  const user = useUser();
  return (
    <Layout.Scroll>
      <Layout.Column px="xs-12" py="xs-12">
        <DebugInfoContainer title="Account" content={user} />
      </Layout.Column>
    </Layout.Scroll>
  );
};
