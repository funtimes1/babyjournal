import React from 'react';

import { TextFieldProps } from '../props';
import { TextField } from './TextField.component';

export const PasswordField = <T,>(props: React.PropsWithChildren<TextFieldProps<T>>) => {
  return <TextField secureTextEntry autoCorrect={false} autoCapitalize="none" {...props} />;
};
