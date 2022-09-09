import { GetServerSideProps } from "next";
import { Box, Grid, Typography } from "@mui/material";
import { People } from "@mui/icons-material";
import { TituloComIcone } from "../../shared/components";
import { findGroups } from "../../services/bff/findGroup";

interface DetalheGrupoProps {
  grupo: {
    id: string;
    title: string;
    description: string;
    users: IUsersGroup[];
  };
}

interface IUsersGroup {
  id: string;
  name: string;
  joinedAt: string;
}

export default function DetalheGrupo({ grupo }: DetalheGrupoProps) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TituloComIcone titulo={grupo.title} icon={<People />} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" mr={3}>
          {grupo.description}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1" mr={3}>
          <strong>{grupo.users.length}</strong>{" "}
          {grupo.users.length > 0 ? "Participantes" : "Participante"}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1" mr={3}>
          <strong>{grupo.users.length}</strong>{" "}
          {grupo.users.length > 0 ? "Participantes" : "Participante"}
        </Typography>
      </Grid>
      <Box>
        {grupo.users.map((user) => {
          return (
            <Box key={user.id}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.joinedAt}</p>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  // const response = await findGroup(id as string, "");

  const response = {
    id: "aa7c16af-ef25-4980-8ec1-c138c244a830",
    title: "Teste",
    description: "teste",
    users: [
      {
        id: "fe2ba560-db9f-42c0-b5d0-6c6a4b0f11b3",
        name: "Vinicius",
        joinedAt: "2022-09-07T18:59:28.064Z",
      },
      {
        id: "fe2ba560-db9f-42c0-b5d0-6c6a4b0f11b3",
        name: "Vinicius",
        joinedAt: "2022-09-07T18:59:28.064Z",
      },
      {
        id: "fe2ba560-db9f-42c0-b5d0-6c6a4b0f11b3",
        name: "Vinicius",
        joinedAt: "2022-09-07T18:59:28.064Z",
      },
    ],
  };

  const grupo = {
    id,
    title: response.title,
    description: response.description,
    users: response.users.map((user) => {
      return {
        ...user,
        joinedAt: new Date(user.joinedAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };
    }),
  };
  return { props: { grupo } };
};
