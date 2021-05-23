import React from 'react';
import { PixelRatio } from 'react-native';
import { OpenSans } from '../../Typography.components';
import { styled } from '../../../theme/theme';
import { ControllerFieldState, FieldError } from 'react-hook-form';

export const ErrorText = styled(OpenSans.Primary)`
  font-size: ${({ theme }) => theme.sizes['2xs-10']}px;
  color: ${({ theme }) => theme.colors.destructive};
  margin: 0px;
  position: absolute;
  bottom: -${15 * PixelRatio.getFontScale()}px;
`;

export const FieldErrorText: React.FC<{ error: FieldError }> = (props) => {
  const { error } = props;
  return <ErrorText>{error ? error.message : ' '}</ErrorText>;
};
