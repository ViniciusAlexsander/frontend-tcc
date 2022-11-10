import { createTheme, ThemeProvider } from "@mui/material";
import {
  useState,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import theme from "../styles/theme";

type SwitchModeThemeProps = {
  children: ReactNode;
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function SwitchModeThemeProvider({ children }: SwitchModeThemeProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const themeMui = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    console.log("mode", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeMui}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
