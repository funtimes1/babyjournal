import React from 'react';
import { Layout } from '../../Layout.components';
import { Mono } from '../../Typography.components';
import { useField } from 'formik';
import { Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

import { FieldError } from './ErrorText.component';
import { BaseFieldWithTextProps } from './props';
import { useColorScheme } from 'react-native';
import { timeFormats } from '../../../lib/date';

export const TimeField: React.FC<BaseFieldWithTextProps> = (props) => {
  const { name, showErrors, showClearButton, ...text } = props;
  const [field, , helpers] = useField<Date>(name);
  const { value } = field;
  const { setValue } = helpers;
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const colorScheme = useColorScheme();
  console.log({ colorScheme });

  return (
    <Layout.Column>
      <Layout.PressableRow
        onPress={() => {
          Keyboard.dismiss();
          setShowTimePicker(true);
        }}
      >
        <Mono.Primary
          style={{ flexGrow: 1 }}
          {...text}
          color={value ? undefined : 'placeholder'}
          weight="light"
        >
          {format(value, timeFormats.time)}
        </Mono.Primary>
        <DateTimePickerModal
          headerTextIOS="Duration"
          mode="time"
          display="spinner"
          isVisible={showTimePicker}
          date={value}
          onConfirm={(date) => {
            setShowTimePicker(false);
            setValue(date);
          }}
          onCancel={() => setShowTimePicker(false)}
        />
      </Layout.PressableRow>
      {!!showErrors && <FieldError {...{ name }} />}
    </Layout.Column>
  );
};
