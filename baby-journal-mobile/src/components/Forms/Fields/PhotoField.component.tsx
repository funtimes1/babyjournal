import { useField } from 'formik';
import React from 'react';

import { PhotoPicker } from '../../PhotoPicker.component';
import { BaseFieldProps } from './props';

export const PhotoField: React.FC<BaseFieldProps> = (props) => {
  const { name } = props;
  const [field, , helpers] = useField<string>(name);
  const { value } = field;
  const { setValue } = helpers;
  return <PhotoPicker value={value} onSelect={setValue} />;
};
