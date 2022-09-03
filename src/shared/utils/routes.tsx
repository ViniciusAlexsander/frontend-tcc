import {
  People,
  AccountCircle,
  Home,
  List,
  Search,
  CheckCircle,
  FeaturedPlayList,
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
        label: "Buscar",
        rota: RotasEnum.FILMES,
        icon: <Search />,
        exibirMenuLateral: true,
      },
      {
        label: "Assistidos",
        rota: RotasEnum.FILMES_ASSISTIDOS,
        icon: <CheckCircle />,
        exibirMenuLateral: true,
      },
      {
        label: "À assistir",
        rota: RotasEnum.FILMES_ASSISTIR,
        icon: <FeaturedPlayList />,
        exibirMenuLateral: true,
      },
    ],
  },
  {
    label: "PERFIL",
    rota: RotasEnum.PERFIL,
    icon: <AccountCircle />,
    exibirMenuLateral: true,
  },
  {
    label: "GRUPOS",
    rota: RotasEnum.GRUPOS,
    icon: <People />,
    exibirMenuLateral: true,
  },
];
