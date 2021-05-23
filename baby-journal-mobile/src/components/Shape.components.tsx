import { css, styled } from '../theme/theme';
import { Layout } from './Layout.components';

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
