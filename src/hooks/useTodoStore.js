import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { FireBaseDB } from "../firebase/config";
import {
  onAddNewTask,
  onAddNewTodo,
  onLoadTodo,
  onDeleteAllTodos,
  onDeleteTodo,
  onEditTodo,
  onSetActiveTodo,
  onSetEditTodo,
  onLoadTask,
} from "../store/todo/todoSlice";
import { useAuthStore } from "./useAuthStore";

export const useTodoStore = () => {
  const { user } = useAuthStore();

  const { todos, todoEdit, activeTodo } = useSelector(
    (state) => state.todoSlice
  );

  const dispatch = useDispatch();

  const startAddNewTodo = async (formState) => {
    try {
      const { id } = await addDoc(
        collection(FireBaseDB, `/users/${user.uid}/todos`),
        formState
      );

      const newTodo = { ...formState, id };

      dispatch(onAddNewTodo(newTodo));

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };

  const startEditTodo = async (todo) => {
    try {
      const docRef = doc(FireBaseDB, `/users/${user.uid}/todos/${todo.id}`);

      await updateDoc(docRef, todo);

      dispatch(onEditTodo(todo));

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error.message);
      return {
        ok: false,
      };
    }
  };

  const setEditTodo = (todo) => {
    dispatch(onSetEditTodo(todo));
  };

  const setActiveTodo = (todo) => {
    dispatch(onSetActiveTodo(todo));
  };

  const startAddNewTask = async (task) => {
    try {
      const { id } = await addDoc(
        collection(
          FireBaseDB,
          `/users/${user.uid}/todos/${activeTodo.id}/tasks`
        ),
        task
      );

      const newTask = { ...task, id };

      dispatch(onAddNewTask({ todoId: activeTodo.id, task: newTask }));

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };

  const startDeleteTodo = async () => {
    try {
      const docRef = doc(
        FireBaseDB,
        `/users/${user.uid}/todos/${activeTodo.id}`
      );

      await deleteDoc(docRef);
      dispatch(onDeleteTodo());
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };

  const startLoadingTodos = async (user) => {
    try {
      const todoDocs = await getDocs(
        collection(FireBaseDB, `/users/${user.uid}/todos`)
      );

      todoDocs.forEach((todo) => {
        const { startDate, endDate } = todo.data();
        const startDateParsed = startDate.toDate();
        const endDateParsed = endDate.toDate();
        dispatch(
          onLoadTodo({
            ...todo.data(),
            id: todo.id,
            startDate: startDateParsed,
            endDate: endDateParsed,
          })
        );
      });

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };

  const startLoadingTasks = async (todo) => {
    try {
      const taskDocs = await getDocs(
        collection(FireBaseDB, `/users/${user.uid}/todos/${todo.id}/tasks`)
      );

      if (taskDocs.docs.length > 0) {
        taskDocs.forEach((taskDoc) => {
          const { id } = taskDoc;
          const task = {
            id,
            ...taskDoc.data(),
          };

          dispatch(onLoadTask({ todoId: todo.id, task }));
        });
      }

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error.message);
      return {
        ok: false,
      };
    }
  };

  const deleteAllTodos = () => {
    dispatch(onDeleteAllTodos());
  };

  return {
    //Properties
    todos,
    todoEdit,
    activeTodo,
    user,

    //Methods
    startAddNewTodo,
    startEditTodo,
    startAddNewTask,
    setEditTodo,
    setActiveTodo,
    startDeleteTodo,
    startLoadingTodos,
    deleteAllTodos,
    startLoadingTasks,
  };
};
