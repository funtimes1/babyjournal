import { Layout, OpenSans } from '@easy-expense/ui/native';
import React from 'react';

import { useGoBack } from '../../navigation/useGoBack';

export const PlaceHolderScreen: React.FC<{ name?: string; onPress?: () => void }> = (props) => {
  const goBack = useGoBack();
  const { name, onPress } = props;
  const placeholder = name ?? 'a new';
  return (
    <Layout.ScreenContainer grow center>
      <OpenSans.Primary
        onPress={onPress ?? goBack}
        style={{ textAlign: 'center' }}
      >{`Placeholder for '${placeholder}' screen`}</OpenSans.Primary>
    </Layout.ScreenContainer>
  );
};
