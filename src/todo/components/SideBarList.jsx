import { Add, Inbox, Mail } from "@mui/icons-material";
import { Button, Divider, Grid, List } from "@mui/material";
import { useTodoStore, useUiStore } from "../../hooks";
import { SideBarItem } from "./SideBarItem";

export const SideBarList = () => {

  const { todos } = useTodoStore();

  return (
    <div>
      {/* <Divider color="white" /> */}
      <List
        sx={{ color: "secondary.main", padding: 0 }}
      >
        {todos.map((todo) => {
          return <SideBarItem key={todo.id} todo={todo} />;
        })}
      </List>
    </div>
  );
};
