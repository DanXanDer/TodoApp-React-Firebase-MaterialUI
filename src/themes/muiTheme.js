import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
   primary:{
    main: '#0C0C1D'
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
