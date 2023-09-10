import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../containers/store";
import { logout } from "../../../utilities/common";
import { styled } from "styled-components";

const drawerWidth = 240;

const ContainerBox = styled(Box)`
  position: relative;

  nav:after {
    position: absolute;
    background: url(https://truyenaudiocv.org/themes/truyenaudiocv/images/nav-bg.png)
      repeat-x center;
    -moz-background-size: auto 100%;
    -o-background-size: auto 100%;
    background-size: auto 100%;
    height: 8px;
    left: 0;
    right: 0;
    bottom: -8px;
    width: 100%;
    content: "";
  }
`;

const AppHeader = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        S3LAP
      </Typography>
      <Divider />
      {isAuth && (
        <List>
          <Button onClick={logoutHandler}>
            <ListItem key={"Đăng suất"} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"Đăng xuất"} />
              </ListItemButton>
            </ListItem>
          </Button>
        </List>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ContainerBox sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ position: "relative", background: "#6b9876" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link to="/">
              <span style={{ color: "white" }}>S3LAP</span>
            </Link>
          </Typography>
          {isAuth && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                key={"Đăng xuất"}
                sx={{ color: "#fff" }}
                onClick={logoutHandler}
              >
                {"Đăng xuất"}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </ContainerBox>
  );
};

export default AppHeader;
