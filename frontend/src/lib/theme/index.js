// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#000000",
      800: "#232323",
      700: "#353535",
      600: "#4f4f4f",
      500: "#595959",
      400: "#6c6c6c",
      300: "#7e7e7e",
      200: "#9a9a9a",
      100: "#bbbbbb",
      50: "#d9d9d9",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "black",
          color: "white",
          _hover: {
            bg: "gray.800",
          },
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderBottom: "1px solid",
            borderColor: "gray.200",
            textTransform: "none",
            letterSpacing: "normal",
            fontWeight: "medium",
          },
          td: {
            borderBottom: "1px solid",
            borderColor: "gray.100",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "#f9f9f9",
        color: "#232323",
      },
    },
  },
});

export default theme;
