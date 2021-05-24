import { View as MotiView, AnimatePresence } from 'moti';
import React from 'react';
import { Icon, IconName } from './Icons/Icon';

import { Layout } from './Layout.components';
import { Circle } from './Shape.components';
import { Spacer } from './Spacer.components';

export const AddButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const options: { name: string; onPress: () => void; iconName: IconName }[] = [
    {
      name: 'add-entry',
      onPress: () => {
        setOpen(false);
      },
      iconName: 'book-outline',
    },
    {
      name: 'add-photo',
      onPress: () => {
        setOpen(false);
      },
      iconName: 'camera-outline',
    },
  ];
  return (
    <Layout.Column absolute={{ bottom: 16, right: 16 }} center>
      <AnimatePresence>
        {open && (
          <MotiView
            from={{
              opacity: 0,
              translateY: +100,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: +100,
            }}
          >
            {options.map((o) => {
              return (
                <Layout.PressableColumn onPress={o.onPress} key={o.name}>
                  <Circle circleSize={40} bg="addButtonOption" center>
                    <Icon name={o.iconName} size={18} iconColor="inverse" />
                  </Circle>
                  <Spacer.Vertical />
                </Layout.PressableColumn>
              );
            })}
          </MotiView>
        )}
      </AnimatePresence>
      <Layout.Column>
        <MotiView
          animate={{ scale: open ? 1.25 : 1 }}
          transition={{ type: 'timing' }}
          style={{ position: 'absolute' }}
        >
          <Circle circleSize={60} bg="addButtonHalo"></Circle>
        </MotiView>
        <Layout.PressableColumn onPress={() => setOpen((open) => !open)}>
          <Circle circleSize={60} bg="addButtonInner" center shadow>
            <MotiView animate={{ rotate: open ? '45deg' : '0deg' }} transition={{ type: 'timing' }}>
              <Icon name="add" size={40} color="white" />
            </MotiView>
          </Circle>
        </Layout.PressableColumn>
      </Layout.Column>
    </Layout.Column>
  );
};
