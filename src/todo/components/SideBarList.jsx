import { Add, Inbox, Mail } from "@mui/icons-material";
import { Button, Divider, Grid, List } from "@mui/material";
import { useTodoStore, useUiStore } from "../../hooks";
import { SideBarItem } from "./SideBarItem";

export const SideBarList = () => {
  const { navbarHeight, openModal } = useUiStore();
  const { todos } = useTodoStore();

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div>
      <Grid
        container
        sx={{
          height: `${navbarHeight}px`,
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <Grid item xs={12} p={1}>
          <Button
            onClick={handleOpenModal}
            fullWidth
            variant="outlined"
            color="info"
            startIcon={<Add />}
          >
            Add todo
          </Button>
        </Grid>
      </Grid>
      {/* <Divider color="white" /> */}
      <List sx={{ color: "secondary.main", padding: 0}}>
        {
          todos.map(todo => {
            return <SideBarItem key={todo.id} todo={todo} />
          })
        }
      </List>
    </div>
  );
};
