import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    completedFirstLoad: false,
    todos: [],
    filterTodoValue: undefined,
    filterTaskValue: undefined,
    activeTodo: null,
    todoEdit: null,
    todosStatus: "loading", // loading, empty or noEmpty
  },
  reducers: {
    onAddNewTodo: (state, action) => {
      if (state.todos.length === 0) {
        state.todosStatus = "noEmpty";
      }
      state.todos.push(action.payload);
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.tasks = [];
        }
        return todo;
      });
      state.activeTodo = action.payload;
      state.saving = false;
    },
    onLoadTodos: (state, action) => {
      state.todos = action.payload;
    },
    onDeleteTodo: (state) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== state.activeTodo.id
      );
      state.activeTodo = null;
      if (state.todos.length === 0) {
        state.todosStatus = "empty";
      }
    },
    onDeleteAllTodos: (state) => {
      //Solo se llamará cuando se cierre sesión, por eso se coloca como estado inicial todosStatus = "loading"
      state.todos = [];
      state.activeTodo = null;
      state.todoEdit = null;
      state.todosStatus = "loading";
    },
    onEditTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo = { ...action.payload };
        }
        return todo;
      });
    },
    onSetEditTodo: (state, action) => {
      state.todoEdit = action.payload;
    },
    onSetfilterTodoValue: (state, action) => {
      state.filterTodoValue = action.payload;
    },
    onAddNewTask: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          if (!todo.tasks) {
            todo.tasks = [];
          } else {
            todo.tasks.push(action.payload.task);
            state.activeTodo = todo;
          }
        }
        return todo;
      });
      state.saving = false;
    },
    onLoadTasks: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.tasks = action.payload.tasks;
        }
        return todo;
      });
    },
    onDeleteTodoTasks: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.tasks = action.payload.tasks;
          state.activeTodo = todo;
        }
        return todo;
      });
    },
    onCompleteTodoTask: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          const task = todo.tasks.find(
            (task) => task.id === action.payload.taskId
          );
          task.completed = !task.completed;
          state.activeTodo = todo;
        }
        return todo;
      });
    },
    onSetActiveTodo: (state, action) => {
      state.activeTodo = action.payload;
    },
    onSetTodosStatus: (state, action) => {
      state.todosStatus = action.payload; //empty noEmpty loading
    },
    onSetFilterTaskValue: (state, action) => {
      state.filterTaskValue = action.payload;
    },
    onsetCompletedFirstLoad: (state) => {
      state.completedFirstLoad = true;
    },
  },
});

export const {
  onAddNewTask,
  onAddNewTodo,
  onDeleteAllTodos,
  onDeleteTodoTasks,
  onDeleteTodo,
  onEditTodo,
  onSetfilterTodoValue,
  onLoadTasks,
  onLoadTodos,
  onSetActiveTodo,
  onSetEditTodo,
  onSetTodosStatus,
  onCompleteTodoTask,
  onSetFilterTaskValue,
  onsetCompletedFirstLoad,
} = todoSlice.actions;
