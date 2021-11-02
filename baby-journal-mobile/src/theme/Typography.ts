import { baseTypography, css, HairlineWidth, TypographyProps } from './theme';

const BaseText = css<TypographyProps>`
  ${baseTypography}
  ${({ debug, theme: { debugBorders } }) =>
    (debugBorders || debug) && `border: solid ${HairlineWidth}px #8dc2e0;`}
`;

const BaseTextInput = css<TypographyProps>`
  ${baseTypography}
  ${({ debug, theme: { debugBorders } }) =>
    (debugBorders || debug) && `border: solid ${HairlineWidth}px #8de0c2;`}
`;

export const BaseTypography = {
  Text: BaseText,
  Input: BaseTextInput,
};

const OpenSansPrimary = css<TypographyProps>`
  ${BaseText}
  font-family: ${({ theme, weight }) => theme.fonts['open-sans'][weight ?? 'regular']};
`;

const OpenSansInput = css<TypographyProps>`
  ${BaseTextInput}
  font-family: ${({ theme, weight }) => theme.fonts['open-sans'][weight ?? 'regular']};
`;

export const OpenSansCSS = {
  Primary: OpenSansPrimary,
  Input: OpenSansInput,
} as const;

const MonoPrimary = css<TypographyProps>`
  ${BaseText}
  font-family: ${({ theme, weight }) => theme.fonts['plex-mono'][weight ?? 'light']};
`;

const MonoInput = css<TypographyProps>`
  ${BaseTextInput}
  font-family: ${({ theme, weight }) => theme.fonts['plex-mono'][weight ?? 'light']};
`;

export const MonoCSS = {
  Primary: MonoPrimary,
  Input: MonoInput,
} as const;
