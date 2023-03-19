import { Route, Routes } from "react-router-dom";
import { TodoPage } from "../pages";

export const TodoRoutes = () => {

  return (
    <Routes>
      <Route path="/*" element={<TodoPage />} />
    </Routes>
  );
};
