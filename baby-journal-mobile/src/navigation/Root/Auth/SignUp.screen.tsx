import React from 'react';
// import { Alert } from 'react-native';
import { Layout } from '../../../components/Layout.components';
import { OpenSans } from '../../../components/Typography.components';

// import { SignUp } from '../../../components/Forms/Auth/SignUp.form';
import { useNav } from '../../useNav';

export const SignUpScreen: React.FC = () => {
  const { navigate, popToTop } = useNav<'SignUp'>();
  return (
    <Layout.Scroll>
      <Layout.Column px py justify grow debug>
        {/* <Formik
          initialValues={{ email: '', password: '', passwordConfirm: '' }}
          validate={SignUp.validate}
          onSubmit={async ({ email, password }) => {
            try {
              await signUp(email, password);
            } catch (error) {
              Alert.alert('Woops', error.message);
            }
          }}
          component={SignUp.Form}
        /> */}
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
      </Layout.Column>
    </Layout.Scroll>
  );
};
