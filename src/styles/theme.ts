import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#8183e3",
      main: "#4e57b0",
      dark: "#122e80",
      contrastText: "#fff",
    },
    secondary: {
      light: "#52c882",
      main: "#0b9655",
      dark: "#00672b",
      contrastText: "#000",
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
