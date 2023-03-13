import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes";
import { TodoRoutes } from "../todo/routes";

export const AppRouter = () => {
  const status = "not-authentica";

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="auth" />} />
        </>
      ) : (
        <>
          <Route path="/todo/*" element={<TodoRoutes />} />
          <Route path="/*" element={<Navigate to="todo" />} />
        </>
      )}
    </Routes>
  );
};
