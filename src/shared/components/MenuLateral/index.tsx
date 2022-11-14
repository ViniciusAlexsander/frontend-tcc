import { useContext, useState } from "react";
import Image from "next/image";
import Router from "next/router";
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
  Collapse,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  Menu,
} from "@mui/icons-material";
import { routes } from "../../utils/routes";
import { AuthContext } from "../../../context/AuthContext";
import { RotasEnum } from "../../utils/rotas";

export interface MenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const { isAuthenticated, signOut } = useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = theme.spacing(28);
  const headerHeight = theme.spacing(7);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickMenuItem = (rota: string) => {
    Router.push(rota);
    handleDrawerToggle();
  };

  const itensMenu = (
    <List
      sx={{
        height: "100%",
        width: drawerWidth,
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: headerHeight },
              width: "100%",
              textAlign: "center",
            }}
          >
            <Image
              width={220}
              height={50}
              src="/logo-sem-borda.png"
              objectFit="cover"
              alt="Logo CINEFAN"
            />
          </Box>
          <Divider />
          <Box>
            {routes.map((route, index) => (
              <Box key={route.rota + index}>
                <ListItemButton
                  onClick={
                    route.menuAninhado
                      ? handleClick
                      : () => {
                          handleClickMenuItem(route.rota);
                        }
                  }
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                  {route.menuAninhado &&
                    (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                {route.menuAninhado && (
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {route.menuAninhado.map((route, index) => (
                        <ListItemButton
                          key={route.rota + index}
                          sx={{ pl: 4 }}
                          onClick={() => {
                            handleClickMenuItem(route.rota);
                          }}
                        >
                          <ListItemIcon>{route.icon}</ListItemIcon>
                          <ListItemText primary={route.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <ListItem disablePadding>
          <ListItemButton
            onClick={
              isAuthenticated
                ? signOut
                : () => {
                    handleClickMenuItem(RotasEnum.LOGIN);
                  }
            }
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={isAuthenticated ? "Sair" : "Fazer login"} />
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
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: { xs: "block", md: "none" },
            height: { xs: headerHeight },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="75%"
            >
              <Image
                width={220}
                height={50}
                src="/logo-sem-borda.png"
                objectFit="cover"
                alt="Logo CINEFAN"
              />
            </Box>
          </Toolbar>
        </AppBar>

        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {itensMenu}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              backgroundColor: "#2c2c2c",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            {itensMenu}
          </Drawer>
        )}
      </Box>
      <Grid
        container
        display="flex"
        flexDirection="column"
        height="100%"
        width={{ xs: "100%", md: `calc(100% - ${drawerWidth})` }}
        marginLeft={{ xs: 0, md: drawerWidth }}
        marginTop={{ xs: headerHeight, md: 0 }}
        padding={{ xs: 2 }}
      >
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
