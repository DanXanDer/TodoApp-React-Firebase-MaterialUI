import { Box } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const TodoPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
    </Box>
  );
};
