import { spacer, SpacerProps, DebugProps, css, HairlineWidth } from './theme';

export const SharedSpacerCss = {
  /**
   * Spacer that takes up `units * grid` amount of horizontal space
   */
  Horizontal: css<SpacerProps>`
    ${spacer.horizontal}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px purple;`}
  `,
  /**
   * Spacer that takes up `units * grid` amount of horizontal space
   */
  Vertical: css<SpacerProps>`
    ${spacer.vertical}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px orange;`}
  `,
  /**
   * Spacer that flexes to take up space in a flex container
   */
  Flex: css<{ grow?: number; shrink?: number } & DebugProps>`
    ${spacer.flex}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) && `border: solid ${HairlineWidth}px pink;`}
  `,
};
