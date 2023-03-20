import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useUiStore } from "../../hooks";
import { SideBarContent } from "./SideBarContent";

export const SideBar = ({ drawerWidth }) => {
  const { mobileOpen, changeMobileOpenStatus } =
    useUiStore();

  const handleDrawerToggle = () => {
    changeMobileOpenStatus(!mobileOpen);
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
            },
          }}
        >
          <SideBarContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
            },
          }}
          open
        >
          <SideBarContent />
        </Drawer>
      </Box>
    </>
  );
};
