import { People, AccountCircle, Home, List } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { ReactElement } from "react";

export interface IRoute {
  label: string;
  rota: string;
  icon: ReactElement;
  exibirMenuLateral?: boolean;
}

export const routes: IRoute[] = [
  {
    label: "Inicio",
    rota: "/",
    icon: <Home />,
    exibirMenuLateral: true,
  },
  { label: "Repositorio", rota: "/", icon: <List />, exibirMenuLateral: true },
  {
    label: "Perfil",
    rota: "/",
    icon: <AccountCircle />,
    exibirMenuLateral: true,
  },
  { label: "Amigos", rota: "/", icon: <People />, exibirMenuLateral: true },
];
