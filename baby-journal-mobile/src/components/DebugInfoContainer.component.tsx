import React from 'react';
import { JsonBlob } from 'turbo-json-blob';

import { LayoutProps } from '../theme/theme';
import { JsonComponents } from './Json.components';
import { Layout } from './Layout.components';
import { OpenSans } from './Typography.components';

function decycle(obj: any, stack: any[] = [], level: number = 0): any {
  if (level > 10) return null;
  if (!obj || typeof obj !== 'object') return obj;

  if (stack.includes(obj)) return null;

  const s = stack.concat([obj]);

  return Array.isArray(obj)
    ? obj.map((x) => decycle(x, s, level + 1))
    : Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, decycle(v, s, level + 1)]));
}

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
      <JsonBlob
        obj={JSON.parse(JSON.stringify(decycle(content), null, 2))}
        Components={JsonComponents}
      />
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
