import React from 'react';
import { Alert } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Layout } from '../../../components/Layout.components';
import { useNav } from '../../useNav';
import { Button } from '../../../components/Button.components';
import { AuthField } from '../../../components/Forms/Auth/AuthField.component';
import { Spacer } from '../../../components/Spacer.components';
import { PasswordField } from '../../../components/Forms/Fields/Text/PasswordField.component';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormDebug } from '../../../components/Forms/FormDebug.component';
import { AddPhoto } from '../../../components/AddPhoto.component';

const schema = z.object({
  category: z.string(),
  time: z.date(),
  duration: z.number().nullable(),
  notes: z.string().optional(),
});

type AddEventFields = {
  category: string;
  notes: string;
  duration?: number;
  time: Date;
};

const Form: React.FC = () => {
  const { navigate, popToTop } = useNav<'AddEvent'>();
  const methods = useForm<AddEventFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { control, handleSubmit, formState } = methods;
  const onSubmit: SubmitHandler<AddEventFields> = async (data) => {
    try {
      Alert.alert(JSON.stringify(data, null, 2));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const { isDirty, isValid } = formState;
  return (
    <>
      <>
        <Layout.Column bg="buttonWhite" px py radius>
          <AddPhoto />
          <Spacer.Vertical />
          <AuthField label="Caption">
            <PasswordField<AddEventFields>
              controllerProps={{ name: 'notes', control, defaultValue: '' }}
              placeholder="This is a great photo of great stuff..."
              multiline
              showErrors
            />
          </AuthField>
        </Layout.Column>
        <Spacer.Vertical />
        <Button.Black
          onPress={handleSubmit(onSubmit)}
          inactiveOnPress={handleSubmit(onSubmit)}
          active={isValid && isDirty}
          content="Add Photo"
        />
      </>
      <FormDebug formState={methods.formState} />
    </>
  );
};

export const AddPhotoScreen: React.FC = () => {
  return (
    <Layout.Scroll>
      <Layout.Column px py grow>
        <Form />
      </Layout.Column>
    </Layout.Scroll>
  );
};
