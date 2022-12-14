import React, { useEffect, useState } from "react";
import Router from "next/router";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import {
  People,
  Groups,
  PersonAdd,
  EventSeat,
  Check,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import {
  Carousel,
  ResponsiveType,
  ModalNovoMembro,
  ModalNovaSessao,
  CardFilme,
  CardInformativo,
  ModalConfirmacao,
} from "../../shared/components";
import { findGroups } from "../../services/bff/findGroup";
import { stringAvatar, stringToColor } from "../../shared/utils/utils";
import { checkAdminGroup } from "../../services/bff/checkAdminGroup";
import { findGroupSessions, ISession } from "../../services/bff/session";
import dayjs from "dayjs";
import { withSSRAuth } from "../../shared/utils/withSSRAuth";
import { deleteGroup } from "../../services/bff/group";
import { RotasEnum } from "../../shared/utils/rotas";

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
  username: string;
}

export default function DetalheGrupo({ id }: DetalheGrupoProps) {
  const [openModalNovoMembro, setOpenModalNovoMembro] =
    useState<boolean>(false);
  const [openModalNovaSessao, setOpenModalNovaSessao] =
    useState<boolean>(false);
  const [openModalExcluirGrupo, setOpenModalExcluirGrupo] =
    useState<boolean>(false);
  const [atualizaDetalhes, setAtualizaDetalhes] = useState<boolean>(false);
  const [grupo, setGrupo] = useState<IDetalheGroup | null>(null);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const handleClickNovoMembro = () => {
    setOpenModalNovoMembro(true);
  };
  const handleClickCriarSessao = () => {
    setOpenModalNovaSessao(true);
  };
  const handleClickExcluirGrupo = () => {
    setOpenModalExcluirGrupo(true);
  };
  const handleCloseModalCriarSessao = () => {
    getGroupDetails();
    setOpenModalNovaSessao(false);
  };
  const handleCloseModalNovoMembro = () => {
    setOpenModalNovoMembro(false);
  };
  const handleCloseModalExcluirGrupo = () => {
    setOpenModalExcluirGrupo(false);
  };

  let sessoesFuturas = sessions.filter((session) =>
    dayjs().isBefore(dayjs(session.sessionDay))
  );
  let sessoesPassadas = sessions.filter((session) =>
    dayjs().isAfter(dayjs(session.sessionDay))
  );

  useEffect(() => {
    if (!openModalNovoMembro) getGroupDetails();

    return () => {
      setAtualizaDetalhes(false);
    };
  }, [id, openModalNovoMembro, atualizaDetalhes]);

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
    const sessions = await findGroupSessions({ groupId: id as string });
    setSessions(sessions);

    sessoesFuturas = sessions.filter((session) =>
      dayjs().isBefore(dayjs(session.sessionDay))
    );
    sessoesPassadas = sessions.filter((session) =>
      dayjs().isAfter(dayjs(session.sessionDay))
    );

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

  const handleExcluirGrupo = async () => {
    try {
      deleteGroup({ groupId: id });
      Router.push(RotasEnum.GRUPOS);
    } catch (error) {
      setAlert({
        message: "Erro ao tentar favoritar o filme, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ message: "", open: false, severity: "success" });
  };

  return (
    <>
      {grupo && (
        <>
          <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              severity={alert.severity}
              sx={{ width: "100%" }}
              onClose={handleCloseAlert}
            >
              {alert.message}
            </Alert>
          </Snackbar>
          <ModalNovoMembro
            open={openModalNovoMembro}
            handleClose={handleCloseModalNovoMembro}
            groupId={grupo?.id}
          />
          <ModalNovaSessao
            open={openModalNovaSessao}
            groupId={grupo?.id}
            handleClose={handleCloseModalCriarSessao}
          />
          <ModalConfirmacao
            titulo="Excluir grupo"
            descricao="Tem certeza que deseja excluir o grupo?"
            handleClose={handleCloseModalExcluirGrupo}
            handleConfirmacao={handleExcluirGrupo}
            open={openModalExcluirGrupo}
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
            <Grid item container maxHeight="50%" xs={9}>
              <Grid item xs={12} height="fit-content">
                <Typography variant="h4" fontWeight="bold">
                  {grupo?.title}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" mb={2}>
                  {grupo?.description}
                </Typography>
              </Grid>

              <Grid item container alignItems="end">
                <Grid item sm={12} md={3}>
                  <Check sx={{ marginRight: 1 }} />
                  <Typography variant="body1">
                    <span>{sessoesPassadas?.length}</span>{" "}
                    {sessoesPassadas?.length > 0 ? " Assistidos" : " Assistido"}
                  </Typography>
                </Grid>

                <Grid item sm={12} md={3}>
                  <People sx={{ marginRight: 1 }} />
                  <Typography variant="body1">
                    <span>{grupo?.users?.length}</span>{" "}
                    {grupo?.users?.length > 0
                      ? " Participantes"
                      : " Participante"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  justifyContent="flex-end"
                >
                  {grupo?.isAdmin && (
                    <Button
                      variant="contained"
                      color="error"
                      size="medium"
                      onClick={handleClickExcluirGrupo}
                    >
                      Excluir grupo
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {/* margin dependendo do tamanho da tela */}
            <Grid
              item
              container
              margin={isMobile ? "1rem 0 1rem 0" : "2rem 0 1rem 0"}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" fontWeight="bold">
                Membros
              </Typography>
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
                arrows
                responsive={responsive}
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
                    }}
                  >
                    <Avatar
                      {...stringAvatar(user.username)}
                      sx={{
                        bgcolor: stringToColor(user.username),
                        width: 70,
                        height: 70,
                        fontSize: "2.25rem",
                        marginBottom: 2,
                      }}
                    />
                    <Typography variant="body1">{user.username}</Typography>
                  </Box>
                ))}
              </Carousel>
            </Grid>
            <Grid
              container
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" fontWeight="bold">
                Sess??es dispon??veis
              </Typography>
              {grupo?.isAdmin && (
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<EventSeat />}
                  onClick={handleClickCriarSessao}
                >
                  Criar sess??o
                </Button>
              )}
            </Grid>
            <Grid
              item
              container
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {sessoesFuturas.length > 0 ? (
                <Carousel
                  responsive={responsiveSessions}
                  arrows
                  mostrarPontos={!isMobile}
                  mostrarProximo
                >
                  {sessoesFuturas.map((session) => (
                    <CardFilme
                      key={session.id}
                      movie={session.movie}
                      setAtualizaDetalhes={setAtualizaDetalhes}
                      session={{
                        ...session,
                        isAdmin: grupo?.isAdmin,
                      }}
                    />
                  ))}
                </Carousel>
              ) : (
                <Box mt={2}>
                  <CardInformativo
                    mensagem={
                      "Nenhum filme marcado para assistir. Clique no bot??o acima para criar uma sess??o."
                    }
                    tipo="info"
                    icon={<SentimentVeryDissatisfied />}
                  />
                </Box>
              )}
            </Grid>

            {sessoesPassadas.length > 0 && (
              <Grid
                item
                container
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Typography variant="h5" fontWeight="bold">
                  Sess??es passadas
                </Typography>

                <Carousel
                  responsive={responsiveSessions}
                  arrows
                  mostrarPontos={!isMobile}
                  mostrarProximo
                >
                  {sessoesPassadas.map((session) => (
                    <CardFilme
                      key={session.id}
                      movie={session.movie}
                      session={{
                        ...session,
                        isAdmin: grupo?.isAdmin,
                      }}
                    />
                  ))}
                </Carousel>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { params } = ctx;
  const { id } = params;

  return { props: { id } };
});

const responsive: ResponsiveType = {
  xl: {
    breakpoint: { max: 3000, min: 1536 },
    items: 7,
    slidesToSlide: 7,
  },
  lg: {
    breakpoint: { max: 1535, min: 1200 },
    items: 5,
    slidesToSlide: 5,
  },
  md: {
    breakpoint: { max: 1199, min: 900 },
    items: 4,
    slidesToSlide: 4,
  },
  sm: {
    breakpoint: { max: 899, min: 600 },
    items: 3,
    slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 599, min: 0 },
    items: 3,
    slidesToSlide: 2,
  },
};

const responsiveSessions: ResponsiveType = {
  xl: {
    breakpoint: { max: 3000, min: 1536 },
    items: 7,
    slidesToSlide: 7,
  },
  lg: {
    breakpoint: { max: 1535, min: 1200 },
    items: 5,
    slidesToSlide: 5,
  },
  md: {
    breakpoint: { max: 1199, min: 900 },
    items: 4,
    slidesToSlide: 4,
  },
  sm: {
    breakpoint: { max: 899, min: 600 },
    items: 4,
    slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 599, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};
