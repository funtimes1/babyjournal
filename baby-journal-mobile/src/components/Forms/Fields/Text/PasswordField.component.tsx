import React from 'react';

import { TextFieldProps } from '../props';
import { TextField } from './TextField.component';

export const PasswordField: React.FC<TextFieldProps> = (props) => {
  return <TextField secureTextEntry autoCorrect={false} autoCapitalize="none" {...props} />;
};
