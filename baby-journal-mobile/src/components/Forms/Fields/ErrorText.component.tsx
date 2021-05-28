import { OpenSans } from '../../Typography.components';
import { styled } from '../../../theme/theme';

import { useField } from 'formik';
import React from 'react';
import { PixelRatio } from 'react-native';

export const ErrorText = styled(OpenSans.Primary)`
  font-size: ${({ theme }) => theme.sizes['2xs-10']}px;
  color: ${({ theme }) => theme.colors.destructive};
  margin: 0px;
  position: absolute;
  bottom: -${15 * PixelRatio.getFontScale()}px;
`;

export const FieldError: React.FC<{ name: string }> = (props) => {
  const { name } = props;
  const [, meta] = useField(name);
  const { touched, error } = meta;
  return (
    <ErrorText>{touched && error ? (Array.isArray(error) ? error[0] : error) : ' '}</ErrorText>
  );
};
