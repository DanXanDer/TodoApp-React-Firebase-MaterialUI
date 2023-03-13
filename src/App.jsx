import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { AppTheme } from "./themes"

export const App = () => {
  return (
    <BrowserRouter>
    <AppTheme>
      <AppRouter/>
    </AppTheme>
    </BrowserRouter>
  )
}
