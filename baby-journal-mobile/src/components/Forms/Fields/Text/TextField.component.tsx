import React from 'react';
import { Layout } from '../../../Layout.components';
import { OpenSans } from '../../../Typography.components';
import { useField } from 'formik';
import { TextInput } from 'react-native';

import { ClearButton } from '../ClearButton.component';
import { FieldError } from '../ErrorText.component';
import { TextFieldProps } from '../props';

export const TextField = React.forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const { name, showErrors, formatter, showClearButton, multiline, ...rest } = props;
  const [field, , helpers] = useField<string>(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;

  return (
    <Layout.Column>
      <Layout.Row align>
        <Layout.Row grow>
          <OpenSans.Input
            ref={ref}
            style={{ flexGrow: 1 }}
            onChangeText={(text) => {
              const newValue = formatter ? formatter(value, text) : text;
              setValue(newValue);
              setTimeout(() => {
              setTouched(true);
              })
            }}
            value={value}
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
                setValue('');
                setTouched(true);
              }}
              multiline={multiline}
            />
          ))}
      </Layout.Row>
      {!!showErrors && <FieldError {...{ name }} />}
    </Layout.Column>
  );
});
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
