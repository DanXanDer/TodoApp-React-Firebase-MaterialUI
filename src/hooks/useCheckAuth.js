import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { onLogin, onLogout } from "../store/auth";
import { useTodoStore } from "./useTodoStore";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();

  const { startLoadingTodos } = useTodoStore();

  useEffect(() => {
    onAuthStateChanged(FireBaseAuth, async (user) => {
      if (!user) {
        return dispatch(onLogout());
      } else {
        const { displayName, uid, email } = user;
        dispatch(onLogin({ displayName, uid, email }));
        await startLoadingTodos(user);
      }
    });
  }, []);

  return {
    status,
  };
};
