import { Logout, Menu, MenuOpen, SearchOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useMemo, useRef } from "react";
import swal from "sweetalert";
import { useAuthStore, useUiStore } from "../../hooks";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50ch",
    },
    [theme.breakpoints.up("xl")]: {
      width: "80ch",
    },
  },
}));

export const NavBar = ({ drawerWidth }) => {
  const { mobileOpen, changeMobileOpenStatus, changeNavbarHeight } =
    useUiStore();

  const { startLogout, displayName } = useAuthStore();

  const navRef = useRef(null);

  useEffect(() => {
    const actualizeNavHeight = () => {
      changeNavbarHeight(navRef.current.offsetHeight);
    };

    actualizeNavHeight();

    window.addEventListener("resize", actualizeNavHeight);

    return () => {
      window.removeEventListener("resize", actualizeNavHeight);
    };
  }, []);

  const handleDrawerToggle = () => {
    changeMobileOpenStatus(!mobileOpen);
  };

  const handleLogout = async () => {
    const willDelete = await swal({
      title: "Are you sure you want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete === true) {
      await startLogout();
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "primary.dark",
        }}
        ref={navRef}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {displayName}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchOutlined />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" } }}>
            <Button
              onClick={handleLogout}
              color="error"
              variant="outlined"
              startIcon={<Logout />}
            >
              Exit
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
