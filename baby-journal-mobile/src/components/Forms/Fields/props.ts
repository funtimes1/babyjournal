import { TextInputProps } from 'react-native';

import { TypographyProps } from '../../../theme/theme';

export type BaseFieldProps = {
  /**
   * keyed value to hook form into field level component
   */
  name: string;
  showErrors?: boolean;
  onValueChange?: (v: any) => void;
};

export type BaseFieldWithTextProps = BaseFieldProps &
  TypographyProps & {
    showClearButton?: boolean;
  };

export type TextFieldProps = BaseFieldWithTextProps &
  TextInputProps & {
    formatter?: (oldValue: string, newValue: string) => string;
  };

export type PickerProps<T> = {
  value: T;
  onSelect: (value: T) => void;
};
