import { Decimal } from '@phensley/cldr';
import { useField } from 'formik';
import React from 'react';
import { TextInput } from 'react-native';

import { useIntlStore } from '../../../../stores/Intl.store';
import { Layout } from '../../../Layout.components';
import { Mono } from '../../../Typography.components';
import { ClearButton } from '../ClearButton.component';
import { FieldError } from '../ErrorText.component';
import { TextFieldProps } from '../props';

type NumberFieldProps = TextFieldProps & {
  scale?: number;
};

const numberParse = (text: string, options?: { decimals?: number; negative?: boolean }) => {
  const digits = text.replace(/[^0-9]+/g, '').replace(/^0+/, '');
  const digitArray = digits.split('') || [];

  let currencyString = '';
  const decimals = options?.decimals ?? 2;
  const max = Math.max(digitArray.length, decimals + 1);
  for (let i = 0; i < max; i++) {
    if (i < digitArray.length) {
      currencyString = currencyString + digitArray[i];
    } else {
      currencyString = 0 + currencyString;
    }
  }

  const length = currencyString.length;
  let decimal =
    currencyString.substring(0, length - decimals) +
    '.' +
    currencyString.substring(length - decimals);

  if (options?.negative) {
    decimal = '-' + decimal;
  }
  return decimal;
};

export const NumberField = React.forwardRef<TextInput, NumberFieldProps>((props, ref) => {
  const { formatNumber } = useIntlStore();
  const { name, showErrors, formatter, scale, showClearButton, ...rest } = props;
  const [field, , helpers] = useField<number | undefined | null>(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;
  const [stringValue, setStringValue] = React.useState('');

  React.useEffect(() => {
    const decimal = new Decimal(value ?? 0);
    setStringValue(formatNumber(decimal));
  }, [value]);

  // since we are using string value to represent what user typed, prefer using that first
  const textFieldValue = value ? stringValue ?? '' : undefined;

  return (
    <Layout.Column>
      <Layout.Row align>
        <Layout.Row grow align>
          <Mono.Primary absolute {...rest}>
            {textFieldValue}
          </Mono.Primary>
          <Mono.Input
            ref={ref}
            style={{ flexGrow: 1, color: 'transparent' }}
            onChangeText={(text) => {
              const parsed = numberParse(text, { decimals: scale });
              const decimal = new Decimal(parsed === '' ? '0' : parsed).setScale(scale ?? 2);
              setValue(Number(decimal.toString()) || null);
              // hack so validation doesn't run too quickly
              setTimeout(() => {
                setTouched(true);
              });
            }}
            value={textFieldValue}
            maxLength={20}
            ellipsizeMode="tail"
            keyboardType="numeric"
            {...rest}
          />
        </Layout.Row>
        {showClearButton ??
          (!!value && (
            <ClearButton
              onPressClear={() => {
                setValue(undefined);
                setStringValue('');
                setTouched(true);
              }}
            />
          ))}
      </Layout.Row>
      {!!showErrors && <FieldError {...{ name }} />}
    </Layout.Column>
  );
});
