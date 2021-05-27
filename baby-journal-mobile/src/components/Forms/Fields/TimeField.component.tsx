import React from 'react';
import { Layout } from '../../Layout.components';
import { Mono, OpenSans } from '../../Typography.components';
import { FieldError, useController } from 'react-hook-form';
import { FieldErrorText } from './ErrorText.component';
import { BaseFieldWithTextProps } from './props';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Keyboard } from 'react-native';

export const TimeField = <T,>(props: React.PropsWithChildren<BaseFieldWithTextProps<T>>) => {
  const { controllerProps, showErrors, ...text } = props;
  const controller = useController(controllerProps);
  const {
    field: { ref, ...inputProps },
    formState,
  } = controller;
  const { onChange, onBlur, value, name } = inputProps;
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  // @ts-expect-error i dunno how to do this yet
  const error = formState.errors[name] as FieldError;
  return (
    <Layout.Column grow>
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
          {`duration`}
        </Mono.Primary>
        <DateTimePickerModal
          headerTextIOS="Duration"
          mode="time"
          display="spinner"
          isVisible={showTimePicker}
          date={date}
          onConfirm={(date) => {
            setShowTimePicker(false);
            setDate(date);
          }}
          onCancel={() => setShowTimePicker(false)}
        />
      </Layout.PressableRow>
      {!!showErrors && <FieldErrorText {...{ error }} />}
    </Layout.Column>
  );
};

// export const TextField = React.forwardRef<TextInput, TextFieldProps>((props, ref) => {
//   const { name, showErrors, formatter, showClearButton, multiline, ...rest } = props;
//   const {} = useController({name});
//   const { value } = field;
//   const { setValue, setTouched } = helpers;

//   return (
//     <Layout.Column>
//       <Layout.Row align>
//         <Layout.Row grow>
//           <OpenSans.Input
//             ref={ref}
//             style={{ flexGrow: 1 }}
//             onChangeText={(text) => {
//               const newValue = formatter ? formatter(value, text) : text;
//               setValue(newValue);
//               setTouched(true);
//             }}
//             value={value}
//             ellipsizeMode="tail"
//             weight="light"
//             multiline={multiline}
//             {...rest}
//           />
//         </Layout.Row>
//         {showClearButton ??
//           (!!value && (
//             <ClearButton
//               onPressClear={() => {
//                 setValue('');
//                 setTouched(true);
//               }}
//               multiline={multiline}
//             />
//           ))}
//       </Layout.Row>
//       {!!showErrors && <FieldError {...{ name }} />}
//     </Layout.Column>
//   );
// });
