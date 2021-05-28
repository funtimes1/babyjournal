import React from 'react';

import { TextFieldProps } from '../props';
import { TextField } from './TextField.component';

export const EmailField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField keyboardType="email-address" autoCorrect={false} autoCapitalize="none" {...props} />
  );
};
