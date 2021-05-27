import React from 'react';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';
import { Spacer } from './Spacer.components';
import { OpenSans } from './Typography.components';

export const AddPhoto: React.FC = () => {
  return (
    <Layout.Row bg="navBackground">
      <Layout.PressableColumn
        grow
        center
        radius
        bg="inverse"
        border={[1, 'dashed', 'primary']}
        py="xs-12"
      >
        <Icon name="camera-outline" size={24} iconColor="primary" />
        <Spacer.Vertical />
        <OpenSans.Primary>Take Photo</OpenSans.Primary>
      </Layout.PressableColumn>
      <Spacer.Horizontal />
      <Layout.PressableColumn
        grow
        center
        radius
        bg="inverse"
        border={[1, 'dashed', 'primary']}
        py="xs-12"
      >
        <Icon name="images-outline" size={24} iconColor="primary" />
        <Spacer.Vertical />
        <OpenSans.Primary>Pick Photo</OpenSans.Primary>
      </Layout.PressableColumn>
    </Layout.Row>
  );
};
