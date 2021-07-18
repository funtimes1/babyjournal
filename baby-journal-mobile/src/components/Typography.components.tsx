import { Text, TextInput, TextProps, ColorValue } from 'react-native';

import { BaseTypography } from '../theme/Typography';
import { styled, TypographyProps } from '../theme/theme';

export const DefaultTextProps: TextProps = {
  allowFontScaling: true,
};

const BaseText = styled(Text).attrs(DefaultTextProps)<TypographyProps>`
  ${BaseTypography.Text}
`;

const BaseTextInput = styled(TextInput).attrs(({ theme }) => ({
  ...DefaultTextProps,
  placeholderTextColor: theme.colors.placeholder as ColorValue | undefined, // weird that we need this type cast...
}))<TypographyProps>`
  ${BaseTypography.Input}
`;

const OpenSansPrimary = styled(BaseText)<TypographyProps>`
  font-family: ${({ theme, weight }) => theme.fonts['open-sans'][weight ?? 'regular']};
`;

const OpenSansSecondary = styled(OpenSansPrimary)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const OpenSansInverse = styled(OpenSansPrimary)`
  color: ${({ theme }) => theme.colors.inverse};
`;

const OpenSansCustom = styled(BaseText)<TypographyProps>`
  font-family: ${({ theme, weight }) => theme.fonts['open-sans'][weight ?? 'regular']};
`;

const OpenSansInput = styled(BaseTextInput)<TypographyProps>`
  font-family: ${({ theme, weight }) => theme.fonts['open-sans'][weight ?? 'regular']};
`;

/**
 * ```
 * const Props = {
 *   grow?: boolean;
 *   center?: boolean;
 *   px?: boolean | number | ThemeSize;
 *   py?: boolean | number | ThemeSize;
 *   bg?: ThemeColor;
 *   absolute?: boolean | {
 *     top?: number;
 *     right?: number;
 *     bottom?: number;
 *     left?: number;
 *   };
 *   radius?: boolean | number | ThemeSize;
 *   border?: [number(border width), 'solid' | 'dotted' | 'dashed', ThemeColor];
 *   shadow?: ShadowType<ThemeColor> | boolean;
 *   size?: ThemeSize;
 *   family?: ThemeFonts;
 *   weight?: 'light' | 'regular' | 'bold';
 *   color?: ThemeColor;
 *   textAlign?: boolean | 'auto' | 'left' | 'right' | 'center' | 'justify';
 * };
 * ```
 */
export const OpenSans = {
  Primary: OpenSansPrimary,
  Secondary: OpenSansSecondary,
  Inverse: OpenSansInverse,
  Custom: OpenSansCustom,
  Input: OpenSansInput,
} as const;

const MonoPrimary = styled(BaseText)`
  font-family: ${({ theme, weight }) => theme.fonts['plex-mono'][weight ?? 'light']};
`;

const MonoSecondary = styled(MonoPrimary)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const MonoInverse = styled(MonoPrimary)`
  color: ${({ theme }) => theme.colors.inverse};
`;

const MonoCustom = styled(BaseText)`
  font-family: ${({ theme, weight }) => theme.fonts['plex-mono'][weight ?? 'light']};
`;

const MonoInput = styled(BaseTextInput)<TypographyProps>`
  font-family: ${({ theme, weight }) => theme.fonts['plex-mono'][weight ?? 'light']};
`;

/**
 * ```
 * const Props = {
 *   grow?: boolean;
 *   center?: boolean;
 *   px?: boolean | number | ThemeSize;
 *   py?: boolean | number | ThemeSize;
 *   bg?: ThemeColor;
 *   absolute?: boolean | {
 *     top?: number;
 *     right?: number;
 *     bottom?: number;
 *     left?: number;
 *   };
 *   radius?: boolean | number | ThemeSize;
 *   border?: [number(border width), 'solid' | 'dotted' | 'dashed', ThemeColor];
 *   shadow?: ShadowType<ThemeColor> | boolean;
 *   size?: ThemeSize;
 *   family?: ThemeFonts;
 *   weight?: 'light' | 'regular' | 'bold';
 *   color?: ThemeColor;
 *   textAlign?: boolean | 'auto' | 'left' | 'right' | 'center' | 'justify';
 * };
 * ```
 */
export const Mono = {
  Primary: MonoPrimary,
  Secondary: MonoSecondary,
  Inverse: MonoInverse,
  Custom: MonoCustom,
  Input: MonoInput,
} as const;
