import { Layout, OpenSans } from '@easy-expense/ui/native';
import { LayoutProps } from '@easy-expense/ui/theme';
import { FixMe } from '@easy-expense/utils';
import React from 'react';
import { JsonBlob } from 'turbo-json-blob';

import { JsonComponents } from './Json.components';

export const DebugInfoContainer: React.FC<
  {
    title?: string;
    content?: FixMe;
  } & LayoutProps
> = (props) => {
  const { title, content, children, ...rest } = props;
  const debugContent = content ? (
    <>
      <OpenSans.Inverse weight="regular">{title ?? 'Info'}:</OpenSans.Inverse>
      <JsonBlob obj={JSON.parse(JSON.stringify(content, null, 2))} Components={JsonComponents} />
    </>
  ) : (
    children
  );
  return (
    <Layout.Column px="xs-12" py="xs-12" bg="primary" radius {...rest}>
      {debugContent}
    </Layout.Column>
  );
};
