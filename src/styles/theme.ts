import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: { default: "#2c2c2c", paper: "#2c2c2c" },
    text: { primary: "#fff" },

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
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "#545454",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "#545454",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "#545454",
          },
        },
      },
    },
  },
});

export default theme;
