import {
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  baseTypography,
  styled,
  divider,
  spacer,
  debug,
  css,
} from "./Theme";

export const Layout = {
  Row: styled("div")`
    ${baseLayout}
    ${baseRowLayout}
    ${debug("red")}
  `,
  Column: styled("div")`
    ${baseLayout}
    ${baseColumnLayout}
    ${debug("blue")}
  `,
};

export const Divider = {
  Horizontal: styled("hr")`
    ${divider.horizontal}
  `,
  Vertical: styled("hr")`
    ${divider.vertical}
  `,
};

export const Spacer = {
  Horizontal: styled("div")`
    ${spacer.horizontal}
    ${debug("orange")}
  `,
  Vertical: styled("div")`
    ${spacer.vertical}
    ${debug("pink")}
  `,
  Flex: styled("div")`
    ${spacer.flex}
    ${debug("cyan")}
  `,
};

export type CircleProps = { circleSize: number };

export const baseCircleStyle = css<CircleProps>`
  border-radius: ${({ circleSize }) => circleSize / 2}px;
  width: ${({ circleSize }) => circleSize}px;
  height: ${({ circleSize }) => circleSize}px;
`;

export const Circle = styled(Layout.Column)<CircleProps>`
  ${baseCircleStyle}
`;

export type SquareProps = { squareSize: number };

export const baseSquareStyle = css<SquareProps>`
  width: ${({ squareSize }) => squareSize}px;
  height: ${({ squareSize }) => squareSize}px;
`;

export const Square = styled(Layout.Column)<SquareProps>`
  ${baseSquareStyle}
`;

export const Text = styled("p")`
  ${baseTypography}
`;
