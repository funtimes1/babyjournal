import { Layout, Spacer } from '@easy-expense/ui/native';
import { LayoutProps } from '@easy-expense/ui/theme';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
