import {
  Box,
  Typography,
  CardActionArea,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { stringAvatar } from "../../utils/utils";

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
  user_name: string;
};

export function CardGrupo({ grupo }: CardGrupoProps) {
  return (
    <CardActionArea
      key={grupo.id}
      sx={{
        width: "200px",
        height: "260px",
        marginLeft: 4,
        border: "#fff solid 1px",
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
            width: 100,
            height: 100,
            fontSize: "2.25rem",
            marginBottom: 2,
          }}
        />
      </Box>

      <Box width="100%">
        <Typography variant="body1" fontWeight="bold">
          {grupo.title}
        </Typography>
        <Typography variant="body1">Participantes:</Typography>
        <AvatarGroup
          total={grupo.users.length}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          {grupo.users.slice(0, 4).map((user) => (
            <Avatar key={user.id} {...stringAvatar(user.user_name)} />
          ))}
        </AvatarGroup>
      </Box>
    </CardActionArea>
  );
}
