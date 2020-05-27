import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
const white = "#FFFFFF";

const appTheme = createMuiTheme({
  palette: {
    white,
    primary: {
      light: "#6d6d6d",
      main: "#424242",
      dark: "#1b1b1b",
      red:"#dc004e",
      constrastText: "#fff",
    },
    secondary: {
      light: "#80e27e",
      main: "#4caf50",
      dark: "#087f23",
      contrastText: "#000",
    },
    background: {
      default: "#F4F6F8",
      paper: "#ffffff",
    },
  },
});

export default appTheme;
