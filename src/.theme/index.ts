import { extendTheme, UsageTheme } from "@yamada-ui/react";
import { components } from "./components";

const customTheme: UsageTheme = { components };

export const theme = extendTheme(customTheme)();
