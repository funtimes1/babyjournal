import { useUser } from '@easy-expense/auth-client';
import { Layout } from '@easy-expense/ui/native';
import React from 'react';

import { DebugInfoContainer } from '../../../../components/DebugInfoContainer.component';

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
