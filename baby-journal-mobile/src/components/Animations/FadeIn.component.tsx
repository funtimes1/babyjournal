import { View as MotiView } from 'moti';
import React from 'react';
import { ViewProps } from 'react-native';

export const FadeIn: React.FC<ViewProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'timing', duration: 1000 }}
      {...rest}
    >
      {children}
    </MotiView>
  );
};
