"use client"
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  semanticTokens: {
    colors: {
      error: 'red.500',
      text: {
        default: 'teal.400',
        _dark: 'teal.200',
      },
    },
  },
   breakpoints : {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});
export default theme;



