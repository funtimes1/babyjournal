import React from 'react';
import { Alert } from 'react-native';
import { login } from '../../../backend/Auth.backend';
import { useForm, Controller, SubmitHandler, FormProvider } from 'react-hook-form';

// import { Login } from "../../../components/Forms/Auth/Login.form";
// import { FormDebug } from "../../../components/Forms/FormDebug.component";
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

const schema = z.object({
  email: z.string().email({ message: 'Please use valid email address' }),
  password: z.string().min(6),
});

type LoginFields = {
  email: string;
  password: string;
};

const Form: React.FC = () => {
  const { navigate, popToTop } = useNav<'Login'>();
  const methods = useForm<LoginFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { control, handleSubmit, formState } = methods;
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const { isDirty, isValid } = formState;
  return (
    <>
      <>
        <Layout.Column bg="buttonWhite" px py radius>
          <AuthField label="Email">
            <EmailField<LoginFields>
              controllerProps={{ name: 'email', control, defaultValue: '' }}
              placeholder="username@email.com"
              showErrors
              autoFocus
            />
          </AuthField>
          <Spacer.Vertical units={2} />
          <AuthField label="Password">
            <PasswordField<LoginFields>
              controllerProps={{ name: 'password', control, defaultValue: '' }}
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
          content="Login"
        />
      </>
      <Layout.PressableColumn
        py
        onPress={() => {
          popToTop();
          navigate('SignUp');
        }}
      >
        <OpenSans.Primary center>Need to make an account?</OpenSans.Primary>
        <OpenSans.Primary center>Sign up</OpenSans.Primary>
      </Layout.PressableColumn>
      <FormDebug formState={methods.formState} />
    </>
  );
};

export const LoginScreen: React.FC = () => {
  return (
    <Layout.Scroll>
      <Layout.Column px py justify grow>
        <Form />
      </Layout.Column>
    </Layout.Scroll>
  );
};
