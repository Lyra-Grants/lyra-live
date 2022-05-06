import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const colors = {
  accent: "#75fbfd",
  meta: "#777E90",
  primaryBg: {
    light: "#fff",
    dark: "#121418",
  },
  secondaryBg: {
    light: "#777E90",
    dark: "#1d1f24",
  },
  primaryText: {
    light: "#23262F",
    dark: "#fcfcfc",
  },
  secondaryText: {
    light: "#b1b5c3",
    dark: "#9b9b9c",
  },
  selected: "#58bf9c",
  "selected-alt": "#00fdfe",
  error: "#FF5050",
  link: "#58bf9c",
  border: "#192119",
};

const components = {
  Link: {
    baseStyle: (props: StyleFunctionProps) => ({
      color: "link",
    }),
    variants: {
      unselected: (props: StyleFunctionProps) => ({
        color: mode("primaryText.light", "primaryText.dark")(props),
      }),
    },
  },
  Text: {
    variants: {
      primary: (props: StyleFunctionProps) => ({
        color: mode("primaryText.light", "primaryText.dark")(props),
      }),
      secondary: (props: StyleFunctionProps) => ({
        color: mode("secondaryText.light", "secondaryText.dark")(props),
      }),
      error: (props: StyleFunctionProps) => ({
        color: "error",
        fontFamily: "Poppins",
        fontSize: "sm",
      }),
      title: (props: StyleFunctionProps) => ({
        color: mode("primaryText.light", "primaryText.dark")(props),
        fontSize: ["2xl", "3xl", "4xl"],
        fontWeight: 700,
        lineHeight: ["1.25em", 10],
      }),
      subtitle: (props: StyleFunctionProps) => ({
        color: mode("primaryText.light", "primaryText.dark")(props),
        fontSize: "sm",
      }),
      paragraph: (props: StyleFunctionProps) => ({
        color: mode("primaryText.light", "primaryText.dark")(props),
        fontSize: "md",
      }),
      heading: (props: StyleFunctionProps) => ({
        color: mode("primaryText.light", "primaryText.dark")(props),
        fontSize: ["2xl", "2xl", "2xl", "3xl"],
        fontWeight: 500,
        lineHeight: "8",
      }),
      meta: (props: StyleFunctionProps) => ({
        color: "meta",
        fontSize: ["sm"],
      }),
      icon: {
        svg: {
          width: 3,
          height: 3,
        },
      },
    },
  },
};

const layerStyles = {
  card: {
    backgroundColor: "#121418",
    background: "linear-gradient(225deg, #121418 0%, #1d1f24 56%)",
    //   "linear-gradient(to right bottom, #121c0f, #0a1b16, #09191a, #0e171b, #121418)",
    overflow: "hidden",
    borderRadius: "lg",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border",
  },
  pill: {
    height: "30px",
    borderRadius: "2xl",
    bg: "accent",
    color: "primaryText.light",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "xs",
    px: 4,
    py: 2,
  },
  coverImage: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%",
  },
  outlined: {
    borderRadius: "lg",
    borderColor: "border",
    borderWidth: "1px",
    borderStyle: "solid",
  },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("primaryBg.light", "primaryBg.dark")(props),
      fontFamily: "Jura, sans-serif",
    },
    "*::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  }),
};

export const theme = extendTheme({
  colors,
  components,
  layerStyles,
  config,
  styles,
});
