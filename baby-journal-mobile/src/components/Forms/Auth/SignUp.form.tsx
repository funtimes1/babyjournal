import { Layout, Spacer } from '@easy-expense/ui/native';
import { useFormikContext } from 'formik';
import React from 'react';
import { z } from 'zod';

import { Button } from '../../Button.components';
import { EmailField } from '../Fields/Text/EmailField.component';
import { PasswordField } from '../Fields/Text/PasswordField.component';
import { validateFormSchema } from '../validateFormSchema';
import { AuthField } from './AuthField.component';

const SignUpSchema = z
  .object({
    email: z.string().nonempty('Email is required').email(),
    password: z.string().nonempty('Password is required').min(6),
    passwordConfirm: z.string(),
  })
  .refine((obj) => obj.password === obj.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'], // this value is concatenated to the end of the actual path of the error
  });

const validation = SignUpSchema;

const validate = validateFormSchema(validation);

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const Form: React.FC = () => {
  const { isValid, dirty, handleSubmit } = useFormikContext();
  return (
    <>
      <Layout.Column bg="formSection" px py radius>
        <AuthField label="Email">
          <EmailField name="email" placeholder="username@email.com" showErrors autoFocus />
        </AuthField>
        <AuthField label="Password">
          <PasswordField name="password" placeholder="***********" showErrors />
        </AuthField>
        <AuthField label="Password Confirmation">
          <PasswordField name="passwordConfirm" placeholder="***********" showErrors />
        </AuthField>
      </Layout.Column>
      <Spacer.Vertical />
      <Button.Black
        onPress={() => handleSubmit()}
        inactiveOnPress={() => handleSubmit()}
        active={isValid && dirty}
        content="Sign up"
      />
    </>
  );
};

export const SignUp = {
  validation,
  validate,
  defaultValues,
  Form,
};
