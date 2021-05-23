import { TypographyProps } from '../../../theme/theme';
import { TextInputProps } from 'react-native';
import { UseControllerProps } from 'react-hook-form';

export type BaseFieldProps<T> = {
  /**
   * keyed value to hook form into field level component
   */
  controllerProps: UseControllerProps<T>;
  showErrors?: boolean;
};

export type BaseFieldWithTextProps<T> = BaseFieldProps<T> &
  TypographyProps & {
    showClearButton?: boolean;
  };

export type TextFieldProps<T> = BaseFieldWithTextProps<T> &
  TextInputProps & {
    formatter?: (oldValue: string, newValue: string) => string;
  };

export type PickerProps<T> = {
  value: T;
  onSelect: (value: T) => void;
};
