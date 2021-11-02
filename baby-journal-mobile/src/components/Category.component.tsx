import React from 'react';

import { categories } from '../lib/category';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';
import { Circle } from './Shape.components';
import { Spacer } from './Spacer.components';
import { OpenSans } from './Typography.components';

export const CategoryMockList: React.FC = () => {
  const [selected, setSelected] = React.useState('');
  return (
    <Layout.Scroll>
      {categories.map((c, i) => {
        const isSelected = c.name === selected;
        return (
          <Layout.Column key={`${c.name}${i}`} align="baseline">
            <Layout.PressableRow
              onPress={() => setSelected(c.name)}
              style={{ marginBottom: 4, marginRight: 4 }}
              px={4}
              py="4xs-4"
              radius="3xl-38"
              align
              bg="primaryHighlight"
            >
              <Circle circleSize={24} style={{ backgroundColor: c.color }} center>
                {isSelected && <Icon name="checkmark-sharp" color={c.iconColor} size={18} />}
              </Circle>
              <Spacer.Horizontal units={0.5} />
              <OpenSans.Inverse size="xs-12" weight="bold" px={4}>
                {c.displayName}
              </OpenSans.Inverse>
              <Spacer.Horizontal />
            </Layout.PressableRow>
          </Layout.Column>
        );
      })}
    </Layout.Scroll>
  );
};
