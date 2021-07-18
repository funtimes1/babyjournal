import { Ionicons } from '@expo/vector-icons';
import { PixelRatio, ViewProps } from 'react-native';

import { Color, styled } from '../../theme/theme';

export const Icon = styled(Ionicons).attrs(({ size }) => ({
  size: (size ?? 1) * PixelRatio.getFontScale(),
}))<{
  iconColor?: Color;
}>`
  ${({ theme, iconColor, color }) =>
    color ? (color as string) : `color: ${theme.colors[iconColor ?? 'primary']};`}
` as React.FC<{ name: IconName; size: number; iconColor?: Color; color?: string } & ViewProps>;
export type IconName = keyof typeof Ionicons['glyphMap'];
