import React from 'react';
import { FieldValues } from 'react-hook-form';

import { TextFieldProps } from '../props';
import { TextField } from './TextField.component';

export const EmailField = <T,>(props: React.PropsWithChildren<TextFieldProps<T>>) => {
  return (
    <TextField keyboardType="email-address" autoCorrect={false} autoCapitalize="none" {...props} />
  );
};
