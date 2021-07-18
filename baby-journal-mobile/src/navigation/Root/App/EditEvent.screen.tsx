import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';

import { Event } from '../../../components/Forms/Event.form';
import { FormDebug } from '../../../components/Forms/FormDebug.component';
import { useFormNavButtons } from '../../../components/Forms/useFormNavButtons';
import { Layout } from '../../../components/Layout.components';
import { saveNewJournalEntryEvent } from '../../../database/journalEntry.database';
import { useDayStore } from '../../../stores/Day.store';
import { useNav } from '../../useNav';

const Form: React.FC = () => {
  useFormNavButtons();
  return (
    <>
      <Event.Form />
      <FormDebug />
    </>
  );
};

export const AddEventScreen: React.FC = () => {
  const { goBack } = useNav<'AddEvent'>();
  const { selectedDay } = useDayStore();
  return (
    <Layout.Scroll>
      <Layout.Column px py grow>
        <Formik
          // @ts-expect-error
          initialValues={{ ...Event.defaultValues, time: new Date() }}
          validate={Event.validate}
          onSubmit={async (values) => {
            try {
              await saveNewJournalEntryEvent(selectedDay, values);
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
