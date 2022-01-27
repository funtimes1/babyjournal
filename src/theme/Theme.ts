import { TurboProps, ThemedProps } from "turbo-props";
import { AllColors } from "./Colors";

export const {
  /*
   * your theme ie. the first argument to the TurboProps function,
   * which is passed to the styled-components ThemeProvider
   */
  theme,
  css, // a css function with your theme baked in
  styled, // a styled function with your theme baked in
  useTheme, // a useTheme hook with your theme baked in
  // `turbo-props` basic building blocks
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  baseTypography,
  spacer,
  divider,
  debug,
} = TurboProps(
  // this is your main app theme, it is returned from the TurboProps function (see `theme` above)
  {
    // be descriptive when describing your color names
    colors: {
      ...AllColors,
      primary: AllColors["black"],
      calendarBackground: AllColors["orange-300"],
      success: "#1FC678",
    },
    /*
     * sizes can be described in any way, we've found it useful to use
     * a hybrid of t-shirt sizing / numeric value to provide both context
     * and detail
     */
    sizes: {
      "s-10": 10,
      "m-18": 18,
      "l-24": 24,
    },
    fonts: {
      mono: {
        light: "monospace 300",
        regular: "monospace 500",
        bold: "monospace 700",
      },
      "sans-serif": {
        light: "sans-serif 300",
        regular: "sans-serif 500",
        bold: "sans-serif 700",
      },
    },
    grid: 8,
  },
  // these are your theme defaults, the values that are used as fallbacks if no value is entered
  // example: <Row px="l-24" /> v. <Row px />
  {
    color: "primary",
    font: "sans-serif",
    weight: "regular",
    sizes: {
      font: "m-18",
      px: "s-10",
      py: "s-10",
      radius: "m-18",
    },
    shadow: {
      color: "primary",
      offset: {
        width: 23,
        height: 20,
      },
      elevation: 0.5,
      radius: 20,
    },
  }
);

/**
 * export the types of your theme to be used when making
 * your UI building blocks
 */
type Theme = typeof theme;
type TP = ThemedProps<Theme>;
export type LayoutProps = TP["LayoutProps"];
export type TypographyProps = TP["TypographyProps"];
export type SpacerProps = TP["SpacerProps"];
export type DividerProps = TP["DividerProps"];
export type Color = TP["Colors"];
export type Size = TP["Sizes"];
export type Font = TP["Fonts"];
export type Weight = TP["Weights"];
export type DebugProps = TP["DebugProps"];
