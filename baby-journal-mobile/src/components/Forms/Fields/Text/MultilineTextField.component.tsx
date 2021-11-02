import React from 'react';

import { TextFieldProps } from '../props';
import { TextField } from './TextField.component';

export const MultilineTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      multiline
      textAlign="left"
      style={{ flexGrow: 1, textAlignVertical: 'top', minHeight: 110 }}
      {...props}
    />
  );
};
