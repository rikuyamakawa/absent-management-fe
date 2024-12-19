import { ComponentStyle } from "@yamada-ui/react";

export const Button: ComponentStyle<"Button"> = {
  baseStyle: {
    _hover: { transform: "scale(1.05)" },
  },
  defaultProps: {
    colorScheme: "teal",
    size: "lg",
  },
};
