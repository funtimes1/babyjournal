import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { login } from '../../../backend/Auth.backend';

import { Login } from '../../../components/Forms/Auth/Login.form';
import { FormDebug } from '../../../components/Forms/FormDebug.component';
import { Layout } from '../../../components/Layout.components';
import { OpenSans } from '../../../components/Typography.components';

import { useNav } from '../../useNav';

const Form: React.FC = () => {
  const { navigate, popToTop } = useNav<'Login'>();

  return (
    <>
      <Login.Form />
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
      <FormDebug />
    </>
  );
};

export const LoginScreen: React.FC = () => {
  return (
    <Layout.Scroll>
      <Layout.Column px py justify grow>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={Login.validate}
          onSubmit={async ({ email, password }) => {
            try {
              await login(email, password);
            } catch (error) {
              Alert.alert('Woops', error.message);
            }
          }}
          component={Form}
        />
      </Layout.Column>
    </Layout.Scroll>
  );
};
