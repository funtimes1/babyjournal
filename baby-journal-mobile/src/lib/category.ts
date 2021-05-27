import { colorForTopic } from './colorGenerators';

export type Category = {
  name: string; // 'feeding', 'napping', 'first-action' etc. kebab-case-because-it-looks-like-a-skewer
  displayName: string; // display version of the category 'feeding' -> 'Feeding', 'first-action' -> 'First Action'
  color: number; // hue value between 0-360
};

export const baseCategories = [
  {
    name: 'first',
    displayName: 'First',
  },
  {
    name: 'feeding',
    displayName: 'Feeding',
  },
  {
    name: 'sleeping',
    displayName: 'Sleeping',
  },
  {
    name: 'crying',
    displayName: 'Crying',
  },
  {
    name: 'sounds',
    displayName: 'Sounds',
  },
  {
    name: 'playing',
    displayName: 'Playing',
  },
  {
    name: 'behavior',
    displayName: 'Behavior',
  },
  {
    name: 'pee-poop-toot',
    displayName: 'Pee, Poop, n Toot',
  },
  {
    name: 'burp-puke-spit',
    displayName: 'Burp, Puke, n Spit',
  },
] as const;

export const categories = baseCategories.map((c, index) => ({
  ...c,
  color: colorForTopic({ count: baseCategories.length, index }),
  iconColor: colorForTopic({ count: baseCategories.length, index, lightVal: '35%' }),
}));
