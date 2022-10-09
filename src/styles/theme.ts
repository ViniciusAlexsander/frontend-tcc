import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#7179C9",
      main: "#4e57b0",
      dark: "#353FA0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FFF5A9",
      main: "#FFEC5B",
      dark: "#E8D434",
      contrastText: "#fff",
    },
    error: {
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
    },
  },
  typography: {
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "'Source Sans Pro', sans-serif",
      },
      styleOverrides: {},
    },
  },
});

export default theme;
