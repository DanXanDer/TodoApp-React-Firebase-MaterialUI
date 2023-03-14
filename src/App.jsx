import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from "./store";
import { AppTheme } from "./themes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <Provider store={store} >
          <AppRouter />
        </Provider>
      </AppTheme>
    </BrowserRouter>
  );
};
