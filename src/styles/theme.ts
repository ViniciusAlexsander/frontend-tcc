import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121214",
    },
    primary: {
      light: "#9BA2E0",
      main: "#7179C9",
      dark: "#353FA0",
      // light: "#7179C9",
      // main: "#353FA0",
      // dark: "#1E2888",
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
      styleOverrides: {
        h4: {
          "@media (max-width:600px)": {
            fontSize: "1.5rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#353FA0",
          ":hover": {
            backgroundColor: "#1E2888",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#353FA0",
        },
        arrow: {
          color: "#353FA0",
        },
      },
    },
  },
});

export default theme;
