import { useFormikContext } from 'formik';
import React from 'react';
import { z } from 'zod';

import { Button } from '../../Button.components';
import { Layout } from '../../Layout.components';
import { Spacer } from '../../Spacer.components';
import { LabelTextField } from '../Fields/LabelTextField.component';
import { EmailField } from '../Fields/Text/EmailField.component';
import { PasswordField } from '../Fields/Text/PasswordField.component';
import { validateFormSchema } from '../validateFormSchema';

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
        <LabelTextField label="Email">
          <EmailField name="email" placeholder="username@email.com" showErrors autoFocus />
        </LabelTextField>
        <LabelTextField label="Password">
          <PasswordField name="password" placeholder="***********" showErrors />
        </LabelTextField>
        <LabelTextField label="Password Confirmation">
          <PasswordField name="passwordConfirm" placeholder="***********" showErrors />
        </LabelTextField>
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
