import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LayoutProps } from '../theme/theme';
import { Layout } from './Layout.components';
import { Spacer } from './Spacer.components';

export const FloatBottom: React.FC<LayoutProps & { bottom?: number }> = (props) => {
  const { children, bottom, ...rest } = props;
  const { bottom: safeBottomArea } = useSafeAreaInsets();

  return (
    <Layout.Row
      absolute={{ left: 0, right: 0, bottom: 0 }}
      pointerEvents="box-none"
      {...rest}
      shadow
    >
      <Layout.Column>
        {children}
        <Spacer.Vertical size={typeof bottom === 'number' ? bottom : Math.max(safeBottomArea, 8)} />
      </Layout.Column>
    </Layout.Row>
  );
};
