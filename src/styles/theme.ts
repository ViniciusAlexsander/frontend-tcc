import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#7179C9",
      main: "#353FA0",
      dark: "#1E2888",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#7179C9",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#7179C9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7179C9",
            },
          },
        },
      },
    },
  },
});

export default theme;
