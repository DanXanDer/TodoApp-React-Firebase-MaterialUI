import { Divider, List } from "@mui/material";
import { useMemo } from "react";
import { useTodoStore } from "../../hooks";
import { SideBarItem } from "./SideBarItem";

export const SideBarList = () => {
  const { todos, filterValue } = useTodoStore();

  const displayedTodos = useMemo(() => {
    if (filterValue) {
      return todos.filter((todo) => todo.priority === filterValue);
    } else {
      return todos;
    }
  }, [todos, filterValue]);

  return (
    <div>
      <List sx={{ color: "secondary.main", padding: 0 }}>
        {displayedTodos.map((todo) => {
          return (
            <div key={todo.id}>
              <SideBarItem todo={todo} />
              <Divider sx={{ backgroundColor: "info.dark" }} />
            </div>
          );
        })}
      </List>
    </div>
  );
};
