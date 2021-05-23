import React from 'react';
import { FormState } from 'react-hook-form';
import { useDebugStore } from '../../stores/Debug.store';

import { DebugInfoContainer } from '../DebugInfoContainer.component';
import { Layout } from '../Layout.components';

export const FormDebug: React.FC<{ formState: FormState<any> }> = (props) => {
  const { formState } = props;
  const { safeDebugFormValues } = useDebugStore();

  if (!safeDebugFormValues()) {
    return null;
  }

  return (
    <Layout.Column py>
      <DebugInfoContainer title="Form Debug" content={formState} />
    </Layout.Column>
  );
};
