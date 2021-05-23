import React from 'react';
import { JsonBlob } from 'turbo-json-blob';
import { LayoutProps } from '../theme/theme';

import { JsonComponents } from './Json.components';
import { Layout } from './Layout.components';
import { OpenSans } from './Typography.components';

export const DebugInfoContainer: React.FC<
  {
    title?: string;
    content?: any;
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
