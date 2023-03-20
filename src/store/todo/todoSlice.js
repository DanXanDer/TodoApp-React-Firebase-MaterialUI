import { createSlice } from "@reduxjs/toolkit";

// const dummyTodo = {
//   id: "",
//   title: "",
//   startDate: "",
//   endDate: "",
//   tasks: [
//     {
//       id: "",
//       taskDesc: "",
//       completed: false,
//     },
//   ],
// };

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: [],
    activeTodo: null,
    todoEdit: null,
  },
  reducers: {
    onAddNewTodo: (state, action) => {
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
    onLoadTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    onDeleteTodo: (state) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== state.activeTodo.id
      );
      state.activeTodo = null;
    },
    onDeleteAllTodos: (state) => {
      state.todos = [];
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
    onAddNewTask: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.tasks.push(action.payload.task);
        }
        return todo;
      });
      state.saving = false;
    },
    onLoadTask: (state, action) => {
      console.log(action.payload);
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          if (!todo.tasks) {
            todo.tasks = [];
          }
          todo.tasks.push(action.payload.task);
        }
        return todo;
      });
    },
    onDeleteTask: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.tasks = todo.tasks.filter(
            (task) => task.taskId !== action.payload.taskId
          );
        }
        return todo;
      });
    },
    onSetActiveTodo: (state, action) => {
      state.activeTodo = action.payload;
    },
  },
});

export const {
  onAddNewTodo,
  onDeleteTodo,
  onAddNewTask,
  onDeleteTask,
  onEditTodo,
  onSetEditTodo,
  onSetActiveTodo,
  onLoadTodo,
  onDeleteAllTodos,
  onLoadTask,
} = todoSlice.actions;
