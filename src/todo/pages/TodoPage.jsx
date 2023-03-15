import { Box } from "@mui/material";
import { useMemo } from "react";
import { useUiStore } from "../../hooks";
import { NavBar, SideBar } from "../components";
import { ActiveTodoView, NothingSelectedView } from "../views";

const drawerWidth = 240;

export const TodoPage = () => {
  const { navbarHeight } = useUiStore();

  const excessHeight = useMemo(() => {
    return navbarHeight + 80 + "px";
  }, [navbarHeight]);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <NothingSelectedView excessHeight={excessHeight} /> */}
        <ActiveTodoView excessHeight={excessHeight} />
      </Box>
    </Box>
  );
};
