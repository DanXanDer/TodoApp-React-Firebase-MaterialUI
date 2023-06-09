import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import { FireBaseDB } from "../firebase/config";
import {
  onAddNewTask,
  onAddNewTodo,
  onLoadTodos,
  onDeleteAllTodos,
  onDeleteTodo,
  onEditTodo,
  onSetActiveTodo,
  onSetEditTodo,
  onLoadTasks,
  onSetTodosStatus,
  onSetfilterTodoValue,
  onDeleteTodoTasks,
  onCompleteTodoTask,
  onSetFilterTaskValue,
  onsetCompletedFirstLoad,
} from "../store/todo/todoSlice";
import { useAuthStore } from "./useAuthStore";

export const useTodoStore = () => {
  const { user } = useAuthStore();

  const {
    todos,
    todoEdit,
    activeTodo,
    todosStatus,
    filterTodoValue,
    filterTaskValue,
    completedFirstLoad,
  } = useSelector((state) => state.todoSlice);

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
      const todosAux = [];

      const todoDocs = await getDocs(
        collection(FireBaseDB, `/users/${user.uid}/todos`)
      );

      if (todoDocs.docs.length > 0) {
        todoDocs.forEach((todo) => {
          const { startDate, endDate } = todo.data();
          const startDateParsed = startDate.toDate();
          const endDateParsed = endDate.toDate();
          todosAux.push({
            ...todo.data(),
            id: todo.id,
            startDate: startDateParsed,
            endDate: endDateParsed,
          });
        });
      }
      dispatch(onLoadTodos(todosAux));

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

  const startLoadingTodoTasks = async (todo) => {
    try {
      const tasksAux = [];

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
          tasksAux.push(task);
        });
      }

      dispatch(onLoadTasks({ todoId: todo.id, tasks: tasksAux }));
      return {
        ok: true,
        tasksAux,
      };
    } catch (error) {
      console.log(error.message);
      return {
        ok: false,
      };
    }
  };

  const startDeletingTodoTasks = async (selectedIds) => {
    try {
      const docsToDelete = selectedIds.map((taskId) => {
        return doc(
          FireBaseDB,
          `/users/${user.uid}/todos/${activeTodo.id}/tasks/${taskId}`
        );
      });

      const promisesDeleteTask = docsToDelete.map((docToDelete) => {
        deleteDoc(docToDelete);
      });

      await Promise.all(promisesDeleteTask);

      const leftTasks = activeTodo.tasks.filter((task) => {
        if (!selectedIds.includes(task.id)) {
          return task;
        }
      });
      dispatch(onDeleteTodoTasks({ todoId: activeTodo.id, tasks: leftTasks }));

      return {
        ok: true,
        leftTasks,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };

  const startCompleteTodoTasks = async (taskId, taskCompletedValue) => {
    try {
      const docRef = doc(
        FireBaseDB,
        `/users/${user.uid}/todos/${activeTodo.id}/tasks/${taskId}`
      );

      await updateDoc(docRef, {
        completed: !taskCompletedValue,
      });

      dispatch(onCompleteTodoTask({ todoId: activeTodo.id, taskId }));

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

  const setfilterTodoValue = (filterTodoValue) => {
    dispatch(onSetfilterTodoValue(filterTodoValue));
  };

  const setFilterTaskValue = (filterTaskValue) => {
    dispatch(onSetFilterTaskValue(filterTaskValue));
  };

  const deleteAllTodos = () => {
    dispatch(onDeleteAllTodos());
  };

  const setTodosStatus = (status) => {
    dispatch(onSetTodosStatus(status));
  };

  const setCompletedFirstLoad = () => {
    dispatch(onsetCompletedFirstLoad());
  };

  return {
    //Properties
    activeTodo,
    filterTaskValue,
    filterTodoValue,
    todoEdit,
    todos,
    todosStatus,
    user,
    completedFirstLoad,

    //Methods
    deleteAllTodos,
    setActiveTodo,
    setEditTodo,
    setfilterTodoValue,
    setTodosStatus,
    startAddNewTask,
    startAddNewTodo,
    startCompleteTodoTasks,
    startDeleteTodo,
    startDeletingTodoTasks,
    startEditTodo,
    startLoadingTodos,
    startLoadingTodoTasks,
    setFilterTaskValue,
    setCompletedFirstLoad,
  };
};
