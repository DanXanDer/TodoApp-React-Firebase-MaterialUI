import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}
