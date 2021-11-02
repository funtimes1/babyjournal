import { View as MotiView } from 'moti';
import React from 'react';
import { ViewProps } from 'react-native';

export const PopDown: React.FC<ViewProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: -100,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      exit={{
        opacity: 0,
        translateY: -100,
      }}
      {...rest}
    >
      {children}
    </MotiView>
  );
};
