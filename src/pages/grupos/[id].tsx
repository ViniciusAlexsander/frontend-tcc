import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import {
  People,
  Groups,
  PersonAdd,
  EventSeat,
  Check,
} from "@mui/icons-material";
import {
  Carousel,
  ResponsiveType,
  ModalNovoMembro,
} from "../../shared/components";
import { findGroups, findGroupsServerSide } from "../../services/bff/findGroup";
import { stringAvatar, stringToColor } from "../../shared/utils/utils";
import {
  checkAdminGroup,
  checkAdminGroupServerSide,
} from "../../services/bff/checkAdminGroup";

interface DetalheGrupoProps {
  id: string;
}

interface IDetalheGroup {
  id: string;
  isAdmin: boolean;
  title: string;
  description: string;
  users: IUsersGroup[];
}

interface IUsersGroup {
  id: string;
  name: string;
  joinedAt: string;
}

export default function DetalheGrupo({ id }: DetalheGrupoProps) {
  const [openModalNovoMembro, setOpenModalNovoMembro] =
    useState<boolean>(false);
  const [grupo, setGrupo] = useState<IDetalheGroup | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const router = useRouter();

  const handleClickNovoMembro = () => {
    setOpenModalNovoMembro(true);
  };
  const handleClose = () => {
    setOpenModalNovoMembro(false);
  };

  const getGroupDetails = async () => {
    let isAdmin: boolean;
    try {
      const checkAdminGroupResponse = await checkAdminGroup({
        groupId: id as string,
      });
      isAdmin = checkAdminGroupResponse.isAdmin;
    } catch (error) {
      isAdmin = false;
    }
    const response = await findGroups({ id: id as string });
    const grupoResponse = response[0];
    setGrupo({
      id,
      isAdmin,
      title: grupoResponse.title,
      description: grupoResponse.description,
      users: grupoResponse.users.map((user) => {
        return {
          ...user,
          joinedAt: new Date(user.joinedAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };
      }),
    });
  };

  useEffect(() => {
    if (!openModalNovoMembro) getGroupDetails();
  }, [openModalNovoMembro]);

  return (
    <>
      {grupo && (
        <>
          <ModalNovoMembro
            open={openModalNovoMembro}
            handleClose={handleClose}
            groupId={grupo?.id}
          />
          <Grid container spacing={2}>
            <Grid item xs={3} textAlign="center">
              <Groups
                sx={{
                  fontSize: "5rem",
                  width: "80%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                }}
              />
            </Grid>
            <Grid item container xs={9}>
              <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold">
                  {grupo?.title}
                </Typography>
              </Grid>

              <Typography variant="body1" my={2}>
                {grupo?.description}
              </Typography>

              <Grid item container alignItems="end">
                <Grid item container sm={12} md={3}>
                  <Check sx={{ marginRight: 1 }} />
                  <Typography variant="body1">
                    <span>{grupo?.users?.length}</span>{" "}
                    {grupo?.users?.length > 0 ? " Assistidos" : " Assistido"}
                  </Typography>
                </Grid>

                <Grid item container sm={12} md={3}>
                  <People sx={{ marginRight: 1 }} />
                  <Typography variant="body1">
                    <span>{grupo?.users?.length}</span>{" "}
                    {grupo?.users?.length > 0
                      ? " Participantes"
                      : " Participante"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {grupo?.isAdmin && (
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<PersonAdd />}
                  onClick={handleClickNovoMembro}
                >
                  Novo membro
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Carousel
                titulo="Membros"
                responsive={responsive}
                arrows
                mostrarPontos={!isMobile}
                mostrarProximo
              >
                {grupo?.users.map((user) => (
                  <Box
                    key={user.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      marginRight: 2,
                    }}
                  >
                    <Avatar
                      {...stringAvatar(user.name)}
                      sx={{
                        bgcolor: stringToColor(user.name),
                        width: 100,
                        height: 100,
                        fontSize: "2.25rem",
                        marginBottom: 2,
                      }}
                    />
                    <Typography variant="body1">{user.name}</Typography>
                  </Box>
                ))}
              </Carousel>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {grupo?.isAdmin && (
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<EventSeat />}
                  onClick={handleClickNovoMembro}
                >
                  Criar sessão
                </Button>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const { id } = params;

  return { props: { id } };
};

const responsive: ResponsiveType = {
  xl: {
    breakpoint: { max: 3000, min: 1536 },
    items: 8,
    slidesToSlide: 7,
  },
  lg: {
    breakpoint: { max: 1535, min: 1200 },
    items: 6,
    slidesToSlide: 5,
  },
  md: {
    breakpoint: { max: 1199, min: 900 },
    items: 5,
    slidesToSlide: 4,
  },
  sm: {
    breakpoint: { max: 899, min: 600 },
    items: 4,
    slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 599, min: 0 },
    items: 3,
    slidesToSlide: 2,
  },
};
