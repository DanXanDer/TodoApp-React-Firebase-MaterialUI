import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
   primary:{
    main: '#1C1C1C'
   },
   secondary:{
    main: '#EEEBE7'
   },
   error:{
    main: '#f44336'
   },
   warning:{
    main: '#ffa726'
   },
   info:{
    main: '#29b6f6'
   },
   success:{
    main: '#66bb6a'
   },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "16px",
    },
  },
});
