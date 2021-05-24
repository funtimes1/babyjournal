import React from 'react';
import { Layout } from './Layout.components';
import { Circle } from './Shape.components';
import { OpenSans } from './Typography.components';
import { colorForTopic } from '../lib/colorGenerators';

const categories = [
  {
    name: 'napping',
    emoji: '😴',
  },
  {
    name: 'feeding',
    emoji: '🍼',
  },
  {
    name: 'play time',
    emoji: '🏀',
  },
  {
    name: 'first',
    emoji: '🥇',
  },
  {
    name: 'napping',
    emoji: '😴',
  },
  {
    name: 'feeding',
    emoji: '🍼',
  },
  {
    name: 'play time',
    emoji: '🏀',
  },
  {
    name: 'first',
    emoji: '🥇',
  },
  {
    name: 'napping',
    emoji: '😴',
  },
  {
    name: 'feeding',
    emoji: '🍼',
  },
  {
    name: 'play time',
    emoji: '🏀',
  },
  {
    name: 'first',
    emoji: '🥇',
  },
];
export const CategoryMockList: React.FC = () => {
  return (
    <Layout.Scroll>
      {categories.map((c, i, a) => {
        const color = colorForTopic({ count: a.length, index: i, lightVal: '80%' });
        const circleColor = colorForTopic({ count: a.length, index: i, lightVal: '75%' });
        return (
          <Layout.Column key={`${c.name}${i}`} align="baseline">
            <Layout.Row
              style={{ marginBottom: 4 }}
              px={4}
              py="4xs-4"
              radius="3xl-38"
              align
              bg="primaryHighlight"
            >
              <Circle circleSize={24} style={{ backgroundColor: circleColor }} center>
                <OpenSans.Secondary size="xs-12" weight="bold">
                  {c.emoji}
                </OpenSans.Secondary>
              </Circle>
              <OpenSans.Inverse size="xs-12" weight="bold" px={4}>
                {c.name}
              </OpenSans.Inverse>
            </Layout.Row>
          </Layout.Column>
        );
      })}
    </Layout.Scroll>
  );
};
