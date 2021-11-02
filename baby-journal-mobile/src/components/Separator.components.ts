import { StyleSheet, View } from 'react-native';

import { divider, DividerProps, styled } from '../theme/theme';

const DefaultSeparatorProps: DividerProps = {
  color: 'defaultSeparator',
  lineWidth: StyleSheet.hairlineWidth,
};

export const Separator = {
  /**
   * Horizontal separator that is hairline thin
   */
  Horizontal: styled(View).attrs(DefaultSeparatorProps)<DividerProps>`
    ${divider.horizontal}
  `,
  /**
   * Vertical separator that is hairline thin
   */
  Vertical: styled(View).attrs(DefaultSeparatorProps)<DividerProps>`
    ${divider.vertical}
  `,
};
