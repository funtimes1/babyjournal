import React from 'react';

import { Button } from '../../Button.components';
import { Icon } from '../../Icons/Icon';
import { Layout } from '../../Layout.components';
import { Spacer } from '../../Spacer.components';

export const ClearButton: React.FC<{ onPressClear: () => void; multiline?: boolean }> = (props) => {
  const { onPressClear, multiline } = props;
  return (
    <Layout.Row align style={{ alignSelf: multiline ? 'flex-start' : undefined }}>
      <Spacer.Horizontal />
      <Button.Borderless onPress={onPressClear}>
        <Icon name="close-circle-outline" size={20} iconColor="primary" />
      </Button.Borderless>
    </Layout.Row>
  );
};
