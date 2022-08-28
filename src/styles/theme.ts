import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#707070",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "sans-serif",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "red",
        },
      },
    },
  },
});

export default theme;
