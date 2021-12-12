import {
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  styled,
  divider,
  spacer,
  debug,
} from "./Theme";

export const Layout = {
  Row: styled("div")`
    ${baseLayout}
    ${baseRowLayout}
    ${debug("red")}
  `,
  Column: styled("div")`
    ${baseLayout}
    ${baseColumnLayout}
    ${debug("blue")}
  `,
};

export const Divider = {
  Horizontal: styled("hr")`
    ${divider.horizontal}
  `,
  Vertical: styled("hr")`
    ${divider.vertical}
  `,
};

export const Spacer = {
  Horizontal: styled("div")`
    ${spacer.horizontal}
    ${debug("orange")}
  `,
  Vertical: styled("div")`
    ${spacer.vertical}
    ${debug("pink")}
  `,
  Flex: styled("div")`
    ${spacer.flex}
    ${debug("cyan")}
  `,
};
