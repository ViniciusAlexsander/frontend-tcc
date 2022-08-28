import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import {
  Box,
  Drawer,
  List,
  Grid,
  Typography,
  AppBar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import { ExitToApp, Menu } from "@mui/icons-material";
import { routes } from "../../utils/routes";

export interface MenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const drawerWidth = theme.spacing(28);
  const headerHeight = theme.spacing(7);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const itensMenu = (
    <List
      sx={{
        height: "100%",
        width: theme.spacing(28),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <ListItem
            disablePadding
            sx={{
              height: { xs: headerHeight },
            }}
          >
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h6" noWrap component="div">
                Cine.repo
              </Typography>
            </Box>
          </ListItem>
          <Divider />
          <Box>
            {routes.map((route, index) => (
              <ListItem key={route.label + index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </Box>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </Box>
    </List>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: { xs: "block", sm: "none" },
            height: { xs: headerHeight },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Cine.repo
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          {itensMenu}
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          {itensMenu}
        </Drawer>
      </Box>
      <Grid
        container
        xs={12}
        height="100vh"
        width={{ xs: "100%", sm: `calc(100% - ${theme.spacing(30)})` }}
        marginLeft={{ xs: 0, sm: theme.spacing(30) }}
        marginTop={{ xs: headerHeight, sm: 0 }}
      >
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};