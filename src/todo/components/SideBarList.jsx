import { Divider, List } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useTodoStore } from "../../hooks";
import { SideBarItem } from "./SideBarItem";

export const SideBarList = ({ displayedTodos }) => {

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
