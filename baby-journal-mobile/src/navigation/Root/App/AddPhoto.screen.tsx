import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';

import { FormDebug } from '../../../components/Forms/FormDebug.component';
import { Photo } from '../../../components/Forms/Photo.form';
import { useFormNavButtons } from '../../../components/Forms/useFormNavButtons';
import { Layout } from '../../../components/Layout.components';
import { saveNewJournalEntryPhoto } from '../../../database/journalEntry.database';
import { useDayStore } from '../../../stores/Day.store';
import { useNav } from '../../useNav';

const Form: React.FC = () => {
  useFormNavButtons();
  return (
    <>
      <Photo.Form />
      <FormDebug />
    </>
  );
};

export const AddPhotoScreen: React.FC = () => {
  const { goBack } = useNav<'AddPhoto'>();
  const { selectedDay } = useDayStore();
  return (
    <Layout.Scroll>
      <Layout.Column px py grow>
        <Formik
          initialValues={{ ...Photo.defaultValues }}
          validate={Photo.validate}
          onSubmit={async (values) => {
            try {
              await saveNewJournalEntryPhoto(selectedDay, values);
              goBack();
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
