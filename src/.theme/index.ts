import { extendTheme, UsageTheme } from "@yamada-ui/react";
import { components } from "./components";
import { semantics } from "./semantics";
import { styles } from "./styles";

const customTheme: UsageTheme = { styles, components, semantics };

export const theme = extendTheme(customTheme)();
