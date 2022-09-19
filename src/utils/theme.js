import { rgba } from "polished";
import { breakpoints } from "./breakpoints";

const defaultColors = {
  primary: "#383F4C",
  primaryHover: "#90A0B7",
  secondary: "#F9F8F8",
  light: "#90A0B7",
  dark: "#2b3940",
  white: "#ffffff",
  ash: "#C2CFE0",
};

const colors = {
  primary: defaultColors.primary,
  primaryHover: defaultColors.primaryHover,
  secondary: defaultColors.secondary,
  light: defaultColors.light,
  lightShade: rgba(defaultColors.light, 0.7),
  dark: defaultColors.dark,
  darkShade: rgba(defaultColors.dark, 0.7),
  bg2: "#f4f7fa",
  bg3: "#f8f8f8",
  bg4: "#fdfdff",
  bg5: "#ecf2f7",
  bg6: "#fff",
  bg7: "#EDF9F2",
  border: "#e7e9ed",
  shadow: rgba(defaultColors.dark, 0.15),
  heading: defaultColors.dark,
  text: rgba(defaultColors.dark, 0.7),
  warning: defaultColors.yellow,
  success: defaultColors.green,
  info: defaultColors.info,

  modes: {
    dark: {
      primary: defaultColors.primary,
      primaryHover: defaultColors.primaryHover,
      secondary: defaultColors.secondary,
      light: defaultColors.light,
      lightShade: rgba(defaultColors.light, 0.7),
      dark: defaultColors.dark,
      darkShade: rgba(defaultColors.dark, 0.7),
      ash: defaultColors.ash,
      bg: defaultColors.light,
      bg2: "#f4f7fa",
      bg3: "#f8f8f8",
      bg4: "#fdfdff",
      bg5: "#ecf2f7",
      bg6: "#fff",
      bg7: "#EDF9F2",
      border: "#e7e9ed",
      shadow: rgba(defaultColors.dark, 0.15),
      heading: defaultColors.dark,
      text: rgba(defaultColors.dark, 0.7),
      warning: defaultColors.yellow,
      success: defaultColors.green,
      info: defaultColors.info,
    },
  },
};

const theme = {
  initialColorModeName: "light",
  colors: colors,
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52, 56, 60, 64, 72, 84, 100, 120, 140],
  breakpoints: [`${breakpoints.sm}px`, `${breakpoints.md}px`, `${breakpoints.lg}px`, `${breakpoints.xl}px`],
};

export default theme;
