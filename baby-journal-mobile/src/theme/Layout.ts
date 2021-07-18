import {
  baseColumnLayout,
  baseLayout,
  baseRowLayout,
  css,
  HairlineWidth,
  LayoutProps,
} from './theme';

export const SharedLayoutCss = {
  //  Row Layout
  Row: css<LayoutProps>`
    ${baseLayout}
    ${baseRowLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px red;`}
  `,
  //  Column Layout
  Column: css<LayoutProps>`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px blue;`}
  `,
  //  Pressable Row Layout
  PressableRow: css<LayoutProps>`
    ${baseLayout}
    ${baseRowLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px green;`}
  `,
  //  Pressable Column Layout
  PressableColumn: css<LayoutProps>`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px yellow;`}
  `,
};
