import { Divider, List } from "@mui/material";
import { useMemo } from "react";
import { useTodoStore } from "../../hooks";
import { SideBarItem } from "./SideBarItem";

export const SideBarList = () => {
  const { todos, filterTodoValue } = useTodoStore();

  const displayedTodos = useMemo(() => {
    if (!!filterTodoValue) {
      return todos.filter((todo) => todo.priority === filterTodoValue);
    } else {
      return todos;
    }
  }, [todos, filterTodoValue]);

  return (
    <div>
      <List sx={{ color: "secondary.main", padding: 0 }}>
        {displayedTodos.map((todo) => {
          return (
            <div key={todo.id}>
              <SideBarItem todo={todo} />
              <Divider sx={{ backgroundColor: "secondary.main" }} />
            </div>
          );
        })}
      </List>
    </div>
  );
};
