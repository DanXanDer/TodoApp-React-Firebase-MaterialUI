import { Box } from "@mui/material";
import { useMemo } from "react";
import { useTodoStore, useUiStore } from "../../hooks";
import { TodoModal, NavBar, SideBar } from "../components";
import { ActiveTodoView, NothingSelectedView } from "../views";

const drawerWidth = 280;

export const TodoPage = () => {
  const { activeTodo } = useTodoStore();

  const { navbarHeight } = useUiStore();

  const excessHeight = useMemo(() => {
    // 32 = 2 * 16
    return navbarHeight + 32 + "px";
  }, [navbarHeight]);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {activeTodo === null ? (
          <NothingSelectedView excessHeight={excessHeight} />
        ) : (
          <ActiveTodoView excessHeight={excessHeight} />
        )}
      </Box>
      <TodoModal />
    </Box>
  );
};
