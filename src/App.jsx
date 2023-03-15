import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from "./store";
import { AppTheme } from "./themes";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enGB } from "date-fns/locale"


export const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <Provider store={store}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <AppRouter />
          </LocalizationProvider>
        </Provider>
      </AppTheme>
    </BrowserRouter>
  );
};
