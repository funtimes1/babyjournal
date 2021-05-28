import React from 'react';
import { Layout } from '../../Layout.components';
import { Separator } from '../../Separator.components';
import { Spacer } from '../../Spacer.components';
import { OpenSans } from '../../Typography.components';

export const LabelTextField: React.FC<{ label: string }> = (props) => {
  const { label, children } = props;

  return (
    <Layout.Column>
      <OpenSans.Primary size="xs-12">{label}:</OpenSans.Primary>
      <Spacer.Vertical units={0.5} />
      {children}
      <Separator.Horizontal />
      <Spacer.Vertical units={2} />
    </Layout.Column>
  );
};
