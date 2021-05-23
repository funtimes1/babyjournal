import React from 'react';
import { Layout } from '../../../Layout.components';
import { OpenSans } from '../../../Typography.components';
import { DeepMap, FieldError, useController } from 'react-hook-form';
import { ClearButton } from '../ClearButton.component';
import { FieldErrorText } from '../ErrorText.component';
import { TextFieldProps } from '../props';

export const TextField = <T,>(props: React.PropsWithChildren<TextFieldProps<T>>) => {
  const { controllerProps, showErrors, formatter, showClearButton, multiline, ...rest } = props;
  const controller = useController(controllerProps);
  const {
    field: { ref, ...inputProps },
    formState,
  } = controller;
  const { onChange, onBlur, value, name } = inputProps;
  // @ts-expect-error i dunno how to do this yet
  const error = formState.errors[name] as FieldError;
  return (
    <Layout.Column>
      <Layout.Row align>
        <Layout.Row grow>
          <OpenSans.Input
            ref={ref}
            style={{ flexGrow: 1 }}
            onChangeText={(text) => {
              const newValue = formatter ? formatter(value as string, text) : text;
              onChange(newValue);
            }}
            onBlur={onBlur}
            value={value as string}
            ellipsizeMode="tail"
            weight="light"
            multiline={multiline}
            {...rest}
          />
        </Layout.Row>
        {showClearButton ??
          (!!value && (
            <ClearButton
              onPressClear={() => {
                onChange('');
              }}
              multiline={multiline}
            />
          ))}
      </Layout.Row>
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
