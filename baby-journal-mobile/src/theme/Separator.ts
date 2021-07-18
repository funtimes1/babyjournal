import { divider, DividerProps, css } from './theme';

export const SharedSeparatorCss = {
  /**
   * Horizontal separator that is hairline thin
   */
  Horizontal: css<DividerProps>`
    ${divider.horizontal}
  `,
  /**
   * Vertical separator that is hairline thin
   */
  Vertical: css<DividerProps>`
    ${divider.vertical}
  `,
};
