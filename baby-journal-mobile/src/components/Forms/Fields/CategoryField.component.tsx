import React from 'react';
import { Layout } from '../../Layout.components';
import { Mono, OpenSans } from '../../Typography.components';
import { useField } from 'formik';
import { Keyboard } from 'react-native';

import { FieldError } from './ErrorText.component';
import { BaseFieldWithTextProps } from './props';
import { categories } from '../../../lib/category';
import { Circle } from '../../Shape.components';
import { Spacer } from '../../Spacer.components';
import { Icon } from '../../Icons/Icon';

type Category = typeof categories[number];

export const CategoryPill: React.FC<{
  category: Category;
  onPress?: (val: string) => void;
  isSelected?: boolean;
}> = (props) => {
  const { category: c, isSelected, onPress } = props;

  return (
    <Layout.Column align="baseline">
      <Layout.PressableRow
        onPress={() => onPress?.(c.name)}
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
};

export const CategoryField: React.FC<BaseFieldWithTextProps> = (props) => {
  const { name, showErrors, showClearButton, ...text } = props;
  const [field, , helpers] = useField<string>(name);
  const { value } = field;
  const { setValue } = helpers;
  const [showCategories, setShowCategories] = React.useState(false);

  const selectedCategory = categories.find((c) => c.name === value);

  return (
    <Layout.Column>
      {!showCategories && (
        <Layout.PressableRow
          onPress={() => {
            Keyboard.dismiss();
            setShowCategories(true);
          }}
          justify="space-between"
          align
        >
          {selectedCategory ? (
            <CategoryPill
              category={selectedCategory}
              isSelected
              onPress={() => {
                Keyboard.dismiss();
                setShowCategories(true);
              }}
            />
          ) : (
            <OpenSans.Primary>Select a Category</OpenSans.Primary>
          )}
          <Icon name="chevron-down" size={24} />
        </Layout.PressableRow>
      )}
      {showCategories && (
        <Layout.Column>
          {categories.map((c, i) => {
            const isSelected = c.name === value;
            return (
              <CategoryPill
                key={`${c.name}${i}`}
                category={c}
                isSelected={isSelected}
                onPress={(value) => {
                  setValue(value);
                  setShowCategories(false);
                }}
              />
            );
          })}
        </Layout.Column>
      )}
      {!!showErrors && <FieldError {...{ name }} />}
    </Layout.Column>
  );
};
