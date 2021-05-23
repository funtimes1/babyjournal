import React from 'react';

import { Button } from '../../../components/Button.components';
import { Layout } from '../../../components/Layout.components';
import { Spacer } from '../../../components/Spacer.components';
import { OpenSans } from '../../../components/Typography.components';
import { useNav } from '../../useNav';

export const WelcomeScreen: React.FC = () => {
  const { navigate } = useNav<'Welcome'>();
  return (
    <Layout.Column grow justify px>
      <Spacer.Flex />
      <OpenSans.Primary size="xl-28" weight="regular">
        Welcome!
      </OpenSans.Primary>
      <Spacer.Vertical units={5} />

      <Button.White onPress={() => navigate('Login')} content="Login" />
      <Spacer.Vertical />
      <Button.White onPress={() => navigate('SignUp')} content="Sign up" />
      <Spacer.Flex />
    </Layout.Column>
  );
};
