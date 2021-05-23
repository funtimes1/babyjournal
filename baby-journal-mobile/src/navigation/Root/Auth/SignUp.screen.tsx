import React from 'react';
import { Alert } from 'react-native';
import { login, signUp } from '../../../backend/Auth.backend';
import { useForm, Controller, SubmitHandler, FormProvider } from 'react-hook-form';

import { Layout } from '../../../components/Layout.components';
import { OpenSans } from '../../../components/Typography.components';
import { useNav } from '../../useNav';
import { Button } from '../../../components/Button.components';
import { AuthField } from '../../../components/Forms/Auth/AuthField.component';
import { Spacer } from '../../../components/Spacer.components';
import { EmailField } from '../../../components/Forms/Fields/Text/EmailField.component';
import { PasswordField } from '../../../components/Forms/Fields/Text/PasswordField.component';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormDebug } from '../../../components/Forms/FormDebug.component';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    password_confirm: z.string().min(6),
  })
  .refine((obj) => obj.password === obj['password_confirm'], {
    message: 'Passwords do not match',
    path: ['password_confirm'], // this value is concatenated to the end of the actual path of the error
  });

type SignUpFields = {
  email: string;
  password: string;
  password_confirm: string;
};

const Form: React.FC = () => {
  const { navigate, popToTop } = useNav<'Login'>();
  const methods = useForm<SignUpFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { control, handleSubmit, formState } = methods;
  const onSubmit: SubmitHandler<SignUpFields> = (data) => signUp(data.email, data.password);

  const { isDirty, isValid } = formState;

  return (
    <>
      <>
        <Layout.Column bg="buttonWhite" px py radius>
          <AuthField label="Email">
            <EmailField<SignUpFields>
              controllerProps={{ name: 'email', control, defaultValue: '' }}
              placeholder="username@email.com"
              showErrors
              autoFocus
            />
          </AuthField>
          <Spacer.Vertical units={2} />
          <AuthField label="Password">
            <PasswordField<SignUpFields>
              controllerProps={{ name: 'password', control, defaultValue: '' }}
              placeholder="***********"
              showErrors
            />
          </AuthField>
          <Spacer.Vertical units={2} />
          <AuthField label="Password Confirm">
            <PasswordField<SignUpFields>
              controllerProps={{ name: 'password_confirm', control, defaultValue: '' }}
              placeholder="***********"
              showErrors
            />
          </AuthField>
        </Layout.Column>
        <Spacer.Vertical />
        <Button.Black
          onPress={handleSubmit(onSubmit)}
          inactiveOnPress={handleSubmit(onSubmit)}
          active={isValid && isDirty}
          content="Sign Up"
        />
      </>
      <Layout.PressableColumn
        py
        onPress={() => {
          popToTop();
          navigate('Login');
        }}
      >
        <OpenSans.Primary center>Already have an account?</OpenSans.Primary>
        <OpenSans.Primary center>Login</OpenSans.Primary>
      </Layout.PressableColumn>
      <FormDebug formState={methods.formState} />
    </>
  );
};

export const SignUpScreen: React.FC = () => {
  return (
    <Layout.Scroll>
      <Layout.Column px py justify grow>
        <Form />
      </Layout.Column>
    </Layout.Scroll>
  );
};
