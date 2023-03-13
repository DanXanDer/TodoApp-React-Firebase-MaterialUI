import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { muiTheme } from "./";

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
