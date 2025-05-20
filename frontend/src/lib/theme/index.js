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
    blue: {
      500: "#17408B",
      600: "#2563EB",
      700: "#1E40AF",
      50: "#E5EDFF",
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props) => {
          const { colorScheme } = props;
          if (colorScheme === "blue") {
            return {
              bg: "blue.500",
              color: "white",
              _hover: {
                bg: "blue.600",
              },
            };
          }
          if (colorScheme === "green") {
            return {
              bg: "green.500",
              color: "white",
              _hover: {
                bg: "green.600",
              },
            };
          }
          if (colorScheme === "red") {
            return {
              bg: "red.500",
              color: "white",
              _hover: {
                bg: "red.600",
              },
            };
          }
          if (colorScheme === "yellow") {
            return {
              bg: "yellow.400",
              color: "black",
              _hover: {
                bg: "yellow.500",
              },
            };
          }
          // Trả về mặc định để Chakra tự xử lý các colorScheme khác
          return {};
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderBottom: "1px solid",
            borderColor: "blue.200",
            textTransform: "none",
            letterSpacing: "normal",
            fontWeight: "medium",
            // bg: "blue.50",
            // color: "blue.800",
          },
          td: {
            borderBottom: "1px solid",
            borderColor: "blue.100",
            // color: "blue.900",
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
