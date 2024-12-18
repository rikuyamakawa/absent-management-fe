import { extendTheme, UsageTheme } from "@yamada-ui/react";
import { components } from "./components";
import { styles } from "./styles";

const customTheme: UsageTheme = { styles, components };

export const theme = extendTheme(customTheme)();
