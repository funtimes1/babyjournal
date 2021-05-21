import { View } from "react-native";
import { SharedSpacerCss } from "../theme/Spacer";
import { DebugProps, SpacerProps, styled } from "../theme/theme";

export const Spacer = {
  /**
   * Spacer that takes up `units * grid` amount of horizontal space
   */
  Horizontal: styled(View)<SpacerProps>`
    ${SharedSpacerCss.Horizontal}
  `,
  /**
   * Spacer that takes up `units * grid` amount of horizontal space
   */
  Vertical: styled(View)<SpacerProps>`
    ${SharedSpacerCss.Vertical}
  `,
  /**
   * Spacer that flexes to take up space in a flex container
   */
  Flex: styled(View)<{ grow?: number; shrink?: number } & DebugProps>`
    ${SharedSpacerCss.Flex}
  `,
};
