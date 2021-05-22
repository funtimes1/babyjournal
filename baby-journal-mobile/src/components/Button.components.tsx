import { PlatformPressable } from '@react-navigation/elements';
import throttle from 'lodash/throttle';
import React from 'react';
import { ViewProps, StyleSheet, PressableProps, View } from 'react-native';
import { BorderlessButton as BaseBorderlessButton } from 'react-native-gesture-handler';

import { useThrottle } from '../hooks/useThrottle';
import { platformValue } from '../lib/Platform/platformValue';
import { baseColumnLayout, baseLayout, LayoutProps, styled, TypographyProps } from '../theme/theme';
import { Layout } from './Layout.components';
import { OpenSans } from './Typography.components';

// type ButtonProps = {
//   wait?: number;
// } & PressableProps;
// // TODO: this BaseButton should render a RNGH RectButton at some point, but right now there
// // is a bug where borders aren't rendered on android, so we will stick with Pressable
// // https://github.com/software-mansion/react-native-gesture-handler/issues/477
// const BaseButton: React.FC<ButtonProps> = (props) => {
//   const { children, onPress, wait = 150, accessibilityLabel } = props;
//   const throttledFunction = throttle(onPress as () => void, wait);

//   return (
//     <Pressable {...props} accessibilityLabel={accessibilityLabel} onPress={throttledFunction}>
//       {children}
//     </Pressable>
//   );
// };

/**
 * To be used to wrap visual elements that need to become a button
 * ie Icons, text without a container etc
 * This button is nice because it renders the Android ripple effect automatically
 */
const BorderlessButton = styled(BaseBorderlessButton).attrs(({ onPress }) => ({
  hitSlop: { top: 20, right: 20, bottom: 20, left: 20 },
  onPress: onPress ? (throttle(onPress, 500) as unknown as () => void) : undefined,
}))`
  align-items: center;
  justify-content: center;
`;

export type ButtonProps = ViewProps &
  PressableProps &
  LayoutProps & {
    inactiveOnPress?: () => void;
    content?: string;
    text?: TypographyProps;
    wait?: number;
    active?: boolean;
  };

const ButtonContainer = styled(View)<LayoutProps>`
  ${baseLayout}
  ${baseColumnLayout}
  ${({ debug, theme: { debugBorders } }) =>
    (debugBorders || debug) && `border: solid ${StyleSheet.hairlineWidth}px rebeccapurple;`}
`;

const DefaultButton: React.FC<ButtonProps> = (props) => {
  const {
    children,
    content,
    text,
    onPress,
    inactiveOnPress = () => null,
    wait,
    py,
    px,
    active = true,
    hitSlop,
    grow,
    radius,
    bg,
    shadow,
    ...rest
  } = props;

  const throttleOnPress = useThrottle(onPress as () => void, wait ?? 500);
  const throttleInactiveOnPress = useThrottle(inactiveOnPress, wait ?? 500);

  const throttledFunction = active && onPress ? throttleOnPress : throttleInactiveOnPress;
  // style the content of the pressable rather than the pressable
  // to avoid x-plat styling bugs
  const buttonContent = (
    <ButtonContainer py={py ?? 8} px={px ?? 20} bg={bg} radius={radius ?? 'xl-28'} center {...rest}>
      {content ? (
        <OpenSans.Custom color={active ? 'primary' : 'secondary'} size="s-16" {...text}>
          {content}
        </OpenSans.Custom>
      ) : (
        <Layout.Row>{children}</Layout.Row>
      )}
    </ButtonContainer>
  );
  return (
    <Layout.Column radius={radius ?? 'xl-28'} {...{ grow, shadow }}>
      {platformValue(
        <PlatformPressable
          onPress={throttledFunction}
          // @ts-expect-error the types are broken right now
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.99 : 1 }],
          })}
          hitSlop={hitSlop}
          {...DefaultPressableProps}
        >
          {buttonContent}
        </PlatformPressable>,
        <PlatformPressable
          onPress={throttledFunction}
          // @ts-expect-error the types are broken right now
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.99 : 1 }],
            opacity: pressed ? 0.8 : 1,
          })}
          hitSlop={hitSlop}
          android_ripple={{ radius: 20 }}
          {...DefaultPressableProps}
        >
          {buttonContent}
        </PlatformPressable>,
      )}
    </Layout.Column>
  );
};

const WhiteButton = styled(DefaultButton).attrs(({ active = true }) => ({
  border: [1.25, 'solid', 'secondary'],
  bg: active ? 'buttonWhite' : 'buttonWhiteInactive',
}))``;

const BlackButton = styled(DefaultButton).attrs(({ active = true }) => ({
  bg: active ? 'buttonBlack' : 'buttonBlackInactive',
  text: {
    color: 'inverse',
  },
}))``;

export const Button = {
  Default: DefaultButton,
  White: WhiteButton,
  Black: BlackButton,
  Borderless: BorderlessButton,
};
