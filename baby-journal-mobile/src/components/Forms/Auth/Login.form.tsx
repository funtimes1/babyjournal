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

const LoginSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required').min(6),
});

const validation = LoginSchema;

const validate = validateFormSchema(validation);

const defaultValues = {
  email: '',
  password: '',
};

const Form: React.FC = () => {
  const { isValid, dirty, handleSubmit } = useFormikContext();
  return (
    <>
      <Layout.Column bg="buttonWhite" px py radius>
        <LabelTextField label="Email">
          <EmailField name="email" placeholder="username@email.com" showErrors autoFocus />
        </LabelTextField>
        <Spacer.Vertical units={2} />
        <LabelTextField label="Password">
          <PasswordField name="password" placeholder="***********" showErrors />
        </LabelTextField>
      </Layout.Column>
      <Spacer.Vertical />
      <Button.Black
        onPress={() => handleSubmit()}
        inactiveOnPress={() => handleSubmit()}
        active={isValid && dirty}
        content="Login"
      />
    </>
  );
};

export const Login = {
  validation,
  validate,
  defaultValues,
  Form,
};
