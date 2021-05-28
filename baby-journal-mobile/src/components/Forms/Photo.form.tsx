import React from 'react';
import { z } from 'zod';
import { AddPhoto } from '../AddPhoto.component';

import { Layout } from '../Layout.components';
import { LabelTextField } from './Fields/LabelTextField.component';
import { MultilineTextField } from './Fields/Text/MultilineTextField.component';
import { validateFormSchema } from './validateFormSchema';

const PhotoSchema = z.object({
  url: z.string().url(),
  caption: z.string().nullable(),
});

const validation = PhotoSchema;

const validate = validateFormSchema(validation);

const defaultValues = {
  url: null,
  caption: null,
};

const Form: React.FC = () => {
  return (
    <>
      <Layout.Column bg="buttonWhite" px py radius>
        <AddPhoto />
        <LabelTextField label="Caption">
          <MultilineTextField name="caption" placeholder="Anything to add? (optional)" showErrors />
        </LabelTextField>
      </Layout.Column>
    </>
  );
};

export const Photo = {
  validation,
  validate,
  defaultValues,
  Form,
};
