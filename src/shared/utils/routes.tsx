import {
  People,
  AccountCircle,
  Home,
  List,
  Search,
  VideoLibrary,
} from "@mui/icons-material";

import React, { ReactElement } from "react";
import { RotasEnum } from "./rotas";

export interface IRoute {
  label: string;
  rota: string;
  icon: ReactElement;
  exibirMenuLateral?: boolean;
  menuAninhado?: IRoute[];
}

export const routes: IRoute[] = [
  {
    label: "INÍCIO",
    rota: RotasEnum.INICIO,
    icon: <Home />,
    exibirMenuLateral: true,
  },
  {
    label: "FILMES",
    rota: RotasEnum.FILMES,
    icon: <List />,
    exibirMenuLateral: true,
    menuAninhado: [
      {
        label: "Descubra",
        rota: RotasEnum.FILMES,
        icon: <Search />,
        exibirMenuLateral: true,
      },
      {
        label: "Meus Filmes",
        rota: RotasEnum.MEUS_FILMES,
        icon: <VideoLibrary />,
        exibirMenuLateral: true,
      },
    ],
  },
  // {
  //   label: "PERFIL",
  //   rota: RotasEnum.PERFIL,
  //   icon: <AccountCircle />,
  //   exibirMenuLateral: true,
  // },
  {
    label: "GRUPOS",
    rota: RotasEnum.GRUPOS,
    icon: <People />,
    exibirMenuLateral: true,
  },
];
