import { format } from 'date-fns';
import { useField } from 'formik';
import React from 'react';
import { Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { timeFormats } from '../../../lib/date';
import { Layout } from '../../Layout.components';
import { Mono } from '../../Typography.components';
import { FieldError } from './ErrorText.component';
import { BaseFieldWithTextProps } from './props';

export const TimeField: React.FC<BaseFieldWithTextProps> = (props) => {
  const { name, showErrors, showClearButton, ...text } = props;
  const [field, , helpers] = useField<Date>(name);
  const { value } = field;
  const { setValue } = helpers;
  const [showTimePicker, setShowTimePicker] = React.useState(false);

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
          textColor="black"
          isDarkModeEnabled={false}
          mode="time"
          is24Hour
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
