import { useFormikContext } from 'formik';
import React from 'react';

import { useDebugStore } from '../../stores/Debug.store';
import { DebugInfoContainer } from '../DebugInfoContainer.component';
import { Layout } from '../Layout.components';

export const FormDebug: React.FC = () => {
  const formik = useFormikContext();
  const { safeDebugFormValues } = useDebugStore();

  if (!safeDebugFormValues()) {
    return null;
  }

  return (
    <Layout.Column py>
      <DebugInfoContainer title="Form Debug" content={formik} />
    </Layout.Column>
  );
};
