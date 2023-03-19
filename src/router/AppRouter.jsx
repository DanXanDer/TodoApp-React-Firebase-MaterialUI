import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { TodoRoutes } from "../todo/routes";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if (status === "checking") return <CheckingAuth />;

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
