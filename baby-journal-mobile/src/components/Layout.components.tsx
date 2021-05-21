import PlatformPressable from "@react-navigation/elements/src/PlatformPressable";
import React from "react";
import {
  View,
  StyleSheet,
  SectionList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedLayoutCss } from "../theme/Layout";
import {
  baseColumnLayout,
  baseLayout,
  LayoutProps,
  styled,
} from "../theme/theme";

export const DefaultPressableProps = {
  pressColor: "#0002",
  pressOpacity: 0.3,
};

export const DefaultScrollableProps = {
  keyboardShouldPersistTaps: "always",
  contentContainerStyle: { flexGrow: 1 },
} as const;

const KeyboardAvoiding: React.FC = (props) => {
  const { children } = props;

  // android handles keyboard differently than ios so keyboard avoiding isn't necessary
  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );
};

/**
 * ```
 * const Props = {
 *   grow?: boolean;
 *   center?: boolean;
 *   px?: boolean | number | ThemeSize;
 *   py?: boolean | number | ThemeSize;
 *   bg?: ThemeColor;
 *   absolute?: boolean | {
 *     top?: number;
 *     right?: number;
 *     bottom?: number;
 *     left?: number;
 *   };
 *   radius?: boolean | number | ThemeSize;
 *   border?: [number(border width), 'solid' | 'dotted' | 'dashed', ThemeColor];
 *   shadow?: ShadowType<ThemeColor> | boolean;
 *   size?: number; // column -> width, row -> height
 *   justify?: boolean | FlexJustifyType('flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly');
 *   align?: boolean | FlexAlignType('flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline');
 *   reverse?: boolean;
 * };
 * ```
 */
export const Layout = {
  //  Row Layout
  Row: styled(View)<LayoutProps>`
    ${SharedLayoutCss.Row}
  `,
  //  Column Layout
  Column: styled(View)<LayoutProps>`
    ${SharedLayoutCss.Column}
  `,
  //  Pressable Row Layout
  PressableRow: styled(PlatformPressable).attrs(
    DefaultPressableProps
  )<LayoutProps>`
    ${SharedLayoutCss.PressableRow}
  `,
  //  Pressable Column Layout
  PressableColumn: styled(PlatformPressable).attrs(
    DefaultPressableProps
  )<LayoutProps>`
    ${SharedLayoutCss.PressableColumn}
  `,
  ScreenContainer: styled(SafeAreaView)`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) &&
      `border: solid ${StyleSheet.hairlineWidth}px #00a2ff;`}
  `,
  Scroll: styled(ScrollView).attrs(DefaultScrollableProps)`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) &&
      `border: solid ${StyleSheet.hairlineWidth}px #c300ff;`}
  `,
  FlatList: styled(FlatList).attrs(DefaultScrollableProps)`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) &&
      `border: solid ${StyleSheet.hairlineWidth}px #7700ff;`}
  ` as unknown as typeof FlatList,
  SectionList: styled(SectionList).attrs(DefaultScrollableProps)`
    ${baseLayout}
    ${baseColumnLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) &&
      `border: solid ${StyleSheet.hairlineWidth}px #3cff00;`}
  ` as unknown as typeof SectionList,
  KeyboardAvoiding,
};
