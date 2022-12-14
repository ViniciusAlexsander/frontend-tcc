import {
  Box,
  Typography,
  CardActionArea,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import Router from "next/router";
import { RotasEnum } from "../../utils/rotas";
import { stringAvatar, stringToColor } from "../../utils/utils";

export interface CardGrupoProps {
  grupo: grupo;
}

type grupo = {
  id: string;
  title: string;
  users: users[];
};

type users = {
  id: string;
  username: string;
};

export function CardGrupo({ grupo }: CardGrupoProps) {
  const handleClickCard = (id: string) => {
    Router.push(`${RotasEnum.GRUPOS}/${id}`);
  };

  return (
    <CardActionArea
      onClick={() => {
        handleClickCard(grupo.id);
      }}
      sx={{
        width: "200px",
        height: "260px",
        marginLeft: 4,
        border: "#fff solid 0.5px",
        borderRadius: "4px",
        padding: 2,
        "&:hover": {
          cursor: "pointer",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          width: "100%",
        }}
      >
        <Avatar
          {...stringAvatar(grupo.title)}
          sx={{
            bgcolor: stringToColor(grupo.title),
            width: 70,
            height: 70,
            fontSize: "2.25rem",
          }}
        />
      </Box>

      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        mt={2}
      >
        <Typography variant="body1" fontWeight="bold" textAlign="center">
          {grupo.title}
        </Typography>
        
        <Box>
          <Typography variant="body1" mb={1}>Participantes:</Typography>
          <AvatarGroup
            total={grupo.users.length}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {grupo.users.slice(0, 4).map((user) => (
              <Avatar
                key={user.id}
                {...stringAvatar(user.username)}
                sx={{
                  bgcolor: stringToColor(user.username),
                }}
              />
            ))}
          </AvatarGroup>
        </Box>
      </Box>
    </CardActionArea>
  );
}
