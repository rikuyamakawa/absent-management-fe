import { ComponentMultiStyle } from "@yamada-ui/react";

export const Card: ComponentMultiStyle<"Card"> = {
  baseStyle: {
    container: {
      borderRadius: "lg",
      _hover: {
        boxShadow: "lg",
        transform: "scale(1.02)",
        transition: "0.2s",
      },
    },
  },
};
