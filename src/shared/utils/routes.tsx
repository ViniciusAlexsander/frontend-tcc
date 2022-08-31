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
    label: "INÍCIO",
    rota: "/",
    icon: <Home />,
    exibirMenuLateral: true,
  },
  { label: "FILMES", rota: "/", icon: <List />, exibirMenuLateral: true },
  {
    label: "PERFIL",
    rota: "/",
    icon: <AccountCircle />,
    exibirMenuLateral: true,
  },
  { label: "GRUPOS", rota: "/", icon: <People />, exibirMenuLateral: true },
];
