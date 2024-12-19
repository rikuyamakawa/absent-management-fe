import { ComponentStyle, mergeStyle } from "@yamada-ui/react";

export const Textarea: ComponentStyle<"Textarea"> = mergeStyle({
  baseStyle: {},
  defaultProps: {
    color: "whiteAlpha.950",
    variant: "flushed",
    textAlign: "left",
    _placeholder: {
      color: "whiteAlpha.800",
    },
  },
})();
