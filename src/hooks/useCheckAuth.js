import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { onLogin, onLogout } from "../store/auth";
import { useTodoStore } from "./useTodoStore";

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  const [firstRender, setFirstRender] = useState(false);

  const { status } = useSelector((state) => state.authSlice);

  const { setCompletedFirstLoad } = useTodoStore();

  const {
    todos,
    startLoadingTodoTasks,
    startLoadingTodos,
    deleteAllTodos,
    setTodosStatus,
  } = useTodoStore();

  useEffect(() => {
    const fetchTasks = async () => {
      if (firstRender === true) {
        if (todos.length > 0) {
          //TODO: Optimizar la carga de tareas
          const loadingTasksPromises = todos.map((todo) =>
            startLoadingTodoTasks(todo)
          );
          await Promise.all(loadingTasksPromises);
          setTodosStatus("noEmpty");
        } else {
          setTodosStatus("empty");
        }
        setCompletedFirstLoad();
      }
    };
    fetchTasks();
  }, [firstRender]);

  useEffect(() => {
    onAuthStateChanged(FireBaseAuth, async (user) => {
      if (!user) {
        dispatch(onLogout());
        deleteAllTodos();
        setFirstRender(false);
      } else {
        const { displayName, uid, email } = user;
        if (displayName !== null) {
          dispatch(onLogin({ displayName, uid, email }));
          await startLoadingTodos(user);
          setFirstRender(true);
        }
      }
    });
  }, []);

  return {
    status,
  };
};
