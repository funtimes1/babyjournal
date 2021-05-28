import { useFormikContext } from 'formik';
import React from 'react';
import { z } from 'zod';

import { Button } from '../Button.components';
import { CategoryMockList } from '../Category.component';
import { Layout } from '../Layout.components';
import { Spacer } from '../Spacer.components';
import { CategoryField } from './Fields/CategoryField.component';
import { LabelTextField } from './Fields/LabelTextField.component';
import { MultilineTextField } from './Fields/Text/MultilineTextField.component';
import { NumberField } from './Fields/Text/NumberField.component';
import { TextField } from './Fields/Text/TextField.component';
import { TimeField } from './Fields/TimeField.component';
import { validateFormSchema } from './validateFormSchema';

const EventSchema = z.object({
  time: z.date(),
  duration: z.number().nonnegative().nullable(),
  category: z.string().nonempty('Category is required'),
  notes: z.string().nullable(),
});

const validation = EventSchema;

const validate = validateFormSchema(validation);

const defaultValues = {
  time: new Date(),
  duration: null,
  category: null,
  notes: null,
};

const Form: React.FC = () => {
  const { isValid, dirty, handleSubmit } = useFormikContext();
  return (
    <>
      <Layout.Column bg="buttonWhite" px py radius>
        <LabelTextField label="Category">
          <CategoryField name="category" />
        </LabelTextField>
        <LabelTextField label="Time">
          <TimeField name="time" showErrors />
        </LabelTextField>
        <LabelTextField label="Duration">
          <NumberField name="duration" placeholder="# of minutes (optional)" showErrors scale={0} />
        </LabelTextField>
        <LabelTextField label="Notes">
          <MultilineTextField name="notes" placeholder="Anything to note? (optional)" showErrors />
        </LabelTextField>
      </Layout.Column>
    </>
  );
};

export const Event = {
  validation,
  validate,
  defaultValues,
  Form,
};
