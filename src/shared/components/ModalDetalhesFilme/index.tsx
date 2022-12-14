import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
  AlertColor,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Check,
  Favorite,
  GroupAddSharp,
  Remove,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Add, ArrowRight, FavoriteBorder } from "@mui/icons-material";
import Router from "next/router";
import { findGenresNamesByIds, IGenre } from "../../utils/movieGenres";
import { CardInformativo, Carousel, ResponsiveType } from "../index";
import {
  stringAvatar,
  stringToColor,
  minutosParaHoras,
} from "../../utils/utils";
import {
  deleteGroupSession,
  joinSession,
  leaveSession,
} from "../../../services/bff/session";
import { RotasEnum } from "../../utils/rotas";
import {
  findOneUserMovie,
  updateMovieInUserList,
} from "../../../services/bff/userMovies";
import { AuthContext } from "../../../context/AuthContext";
import dayjs from "dayjs";

interface ModalDetalhesFilmeProps {
  movie: IMovie;
  session?: ISessions;
  open: boolean;
  handleClose: () => void;
  setAtualizaDetalhes?: (value: boolean) => void;
}

type ISessions = {
  id: string;
  groupId: string;
  assistedInId: string;
  createdAt: Date;
  sessionDay?: Date;
  users: IUser[];
  isAdmin: boolean;
};

type IUser = {
  id: string;
  username: string;
};

type IMovie = {
  backdrop_path?: string;
  genres?: IGenre[];
  genre_ids?: number[];
  id: number;
  watched?: boolean;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  release_date: Date;
  runtime?: number | null;
  title: string;
};

export function ModalDetalhesFilme({
  movie,
  open,
  session,
  handleClose,
  setAtualizaDetalhes,
}: ModalDetalhesFilmeProps) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [watchedButton, setWatchedButton] = useState(null);
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });

  const theme = useTheme();

  const isSessionOpen = dayjs().isBefore(dayjs(session.sessionDay));
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (movie?.id && open && isAuthenticated) {
      getUserMovieInfo(movie.id);
    }
  }, [isAuthenticated, movie.id, open]);

  const handleClickJoinSession = async (sessionId: string) => {
    try {
      setLoadingButton(true);
      await joinSession({ sessionId });
      setAtualizaDetalhes(true);

      setAlert({
        message: "Voc?? entrou na sess??o com sucesso",
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Erro ao entrar na sess??o, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleClickLeaveSession = async (sessionId: string) => {
    try {
      setLoadingButton(true);
      await leaveSession({ sessionId });
      setAtualizaDetalhes(true);

      setAlert({
        message: "Voc?? saiu da sess??o",
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Erro ao sair da sess??o, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleClickDeleteSession = async (sessionId: string) => {
    try {
      setLoadingButton(true);
      await deleteGroupSession({ sessionId });

      setAlert({
        message: "Voc?? deletou a sess??o com sucesso",
        open: true,
        severity: "success",
      });

      setAtualizaDetalhes(true);
      handleClose();
    } catch (error) {
      setAlert({
        message: "Erro ao deletar na sess??o, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleClickVerMais = (id: number) => {
    Router.push(`${RotasEnum.FILMES}/${id}`);
  };

  const getUserMovieInfo = async (movieId: number) => {
    const { movie } = await findOneUserMovie({ movieId });
    setWatchedButton(movie.watched);
    setFavoriteButton(movie.favorite);
  };

  const handleUpdateMovieInUserList = async (movieId: number) => {
    try {
      const { watched } = await updateMovieInUserList({
        movieId,
        watched: watchedButton === null ? false : !watchedButton ? true : null,
      });
      setWatchedButton(watched);
    } catch (error) {
      setAlert({
        message: "Erro ao tentar atualizar o filme, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    }
  };

  const handleUpdateMovieInUserListFavorite = async (movieId: number) => {
    try {
      const { favorite } = await updateMovieInUserList({
        movieId,
        favorite: !favoriteButton,
      });
      setFavoriteButton(favorite);
    } catch (error) {
      setAlert({
        message: "Erro ao tentar favoritar o filme, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Box sx={{ backgroundColor: "#202024" }}>
        {/* <div 
          style={{
            backgroundImage: `url(../../public/fundo-transparente.png)`,
            height: "350px",
            width: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        ></div>
        <iframe
          id="ytplayer"
          style={{ width: "100%", height: "350px", position: "absolute", border: 0 }}
          width="100%"
          height="300px"
          allow="autoplay"
          src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&controls=1&showinfo=0&rel=0&loop=1&playlist=tgbNymZ7vqY"
        ></iframe> */}
        <Box
          sx={{
            backgroundImage: `url(${movie.backdrop_path})`,
            backgroundSize: "cover",
            height: "350px",
            width: "100%",
          }}
          width="100%"
          height="300px"
          display="flex"
          alignItems="end"
        >
          {/* TITULO E BOTOES */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            marginBottom="10px"
            paddingX="10px"
            zIndex={10}
          >
            {/* TITULO E DATA */}
            <Box
              sx={{
                backgroundColor: "#202024",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "5px 20px",
                padding: "5px 15px",
                display: "flex",
                alignItems: "end",
                maxWidth: "80%",
              }}
            >
              <Typography variant="h4" fontWeight="bold" lineHeight="1">
                {movie.title}
              </Typography>
              <Typography
                ml={2}
                fontWeight="800"
                variant="body1"
                color={theme.palette.primary.main}
              >
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            </Box>

            {/* BOTOES */}
            {isAuthenticated && (
              <Box>
                <Tooltip
                  title={
                    !favoriteButton ? "Adicionar favorito" : "Remover favorito"
                  }
                  placement="top"
                  arrow
                >
                  <IconButton
                    sx={iconButtonsStyles}
                    onClick={() =>
                      handleUpdateMovieInUserListFavorite(movie.id)
                    }
                  >
                    {favoriteButton && (
                      <Favorite
                        fontSize="medium"
                        htmlColor={theme.palette.primary.light}
                      />
                    )}

                    {!favoriteButton && (
                      <FavoriteBorder fontSize="medium" htmlColor="#fff" />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    watchedButton === null
                      ? "Adicionar em ?? assistir"
                      : watchedButton
                      ? "Remover de assistidos"
                      : "Adicionar em assistidos"
                  }
                  placement="top"
                  arrow
                >
                  <IconButton
                    sx={iconButtonsStyles}
                    onClick={() => handleUpdateMovieInUserList(movie.id)}
                  >
                    {watchedButton === null && (
                      <Add htmlColor="#fff" fontSize="medium" />
                    )}

                    {watchedButton === false && (
                      <Remove htmlColor="#fff" fontSize="medium" />
                    )}

                    {watchedButton === true && (
                      <Check htmlColor="#fff" fontSize="medium" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>

        <Grid container padding="0.5rem 1rem 1rem 1rem">
          <Grid item xs={12} sm={8}>
            <Box display="flex" alignItems="flex-end" mr={2}>
              <Typography variant="body1" mr={3}>
                <span color="#939399">T??tulo original: </span>
                {movie.original_title}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="body1">
                <span color="#939399">Popularidade: </span>
                {movie.popularity}
              </Typography>
            </Box>
            {movie.runtime && (
              <Box display="flex" alignItems="center">
                <Typography variant="body1">
                  <span color="#939399">Dura????o: </span>
                  {minutosParaHoras(movie.runtime)}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            alignItems={{ xs: "center", sm: "end" }}
            flexDirection={{ xs: "row", sm: "column" }}
            justifyContent={{ xs: "start" }}
            textAlign={{ xs: "left", sm: "right" }}
          >
            <Typography variant="body1" mr={{ xs: 3, sm: 0 }}>
              <span color="#939399">Gen??ro: </span>
              {movie.genre_ids && findGenresNamesByIds(movie.genre_ids)}
              {movie.genres &&
                movie.genres.map((gender) => gender.name).join(", ")}
            </Typography>
          </Grid>
          <Grid container item xs={12} mt={{ xs: 1, sm: 2 }}>
            <Typography variant="body1" textAlign="justify">
              {movie.overview}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            mt={{ xs: 1, sm: 3 }}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            {session.isAdmin && (
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={() => handleClickDeleteSession(session.id)}
              >
                Excluir sess??o
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            mt={{ xs: 1, sm: 3 }}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleClickVerMais(movie.id)}
            >
              Ver mais
            </Button>
          </Grid>
          {session && session.id && (
            <>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={3}
              >
                <Typography variant="h5" fontWeight={700}>
                  Participantes
                </Typography>

                {isSessionOpen &&
                  !(
                    session?.users.filter((e) => e.id === user.id).length > 0
                  ) && (
                    <LoadingButton
                      variant="contained"
                      size="large"
                      onClick={() => handleClickJoinSession(session.id)}
                      loading={loadingButton}
                      loadingPosition="start"
                      startIcon={<GroupAddSharp />}
                    >
                      Participar da sess??o
                    </LoadingButton>
                  )}

                {isSessionOpen &&
                  session?.users.filter((e) => e.id === user.id).length > 0 && (
                    <LoadingButton
                      variant="contained"
                      color="error"
                      size="large"
                      onClick={() => handleClickLeaveSession(session.id)}
                      loading={loadingButton}
                      loadingPosition="start"
                    >
                      Sair da sess??o
                    </LoadingButton>
                  )}
              </Box>
              <Grid container item xs={12} mt={{ xs: 2, sm: 4 }}>
                {session?.users?.length > 0 && (
                  <Carousel
                    responsive={responsive}
                    arrows
                    mostrarPontos={!isMobile}
                    mostrarProximo
                  >
                    {session?.users.map((participant) => (
                      <Box
                        key={participant.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          marginRight: 2,
                        }}
                      >
                        <Avatar
                          {...stringAvatar(participant.username)}
                          sx={{
                            bgcolor: stringToColor(participant.username),
                            width: { xs: 60, sm: 80 },
                            height: { xs: 60, sm: 80 },
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                            marginBottom: 2,
                          }}
                        />
                        <Typography variant="body1" textAlign="center">
                          {participant.username}
                        </Typography>
                      </Box>
                    ))}
                  </Carousel>
                )}

                {session?.users?.length === 0 && (
                  <CardInformativo
                    mensagem={
                      isSessionOpen
                        ? "Ningu??m ingressou nessa sess??o ainda, mas voc?? pode ser o primeiro!"
                        : "Ningu??m participou dessa sess??o"
                    }
                    tipo="info"
                    icon={<SentimentVeryDissatisfied />}
                  />
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Dialog>
  );
}

const iconButtonsStyles = {
  marginRight: "0.5rem",
  padding: "0.5rem",
  backgroundColor: "#343434",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  ":hover": {
    backgroundColor: "#202024",
    borderColor: "rgba(255, 255, 255, 1)",
  },
};

const responsive: ResponsiveType = {
  xl: {
    breakpoint: { max: 3000, min: 1536 },
    items: 5,
    slidesToSlide: 7,
  },
  lg: {
    breakpoint: { max: 1535, min: 1200 },
    items: 5,
    slidesToSlide: 5,
  },
  md: {
    breakpoint: { max: 1199, min: 900 },
    items: 5,
    slidesToSlide: 4,
  },
  sm: {
    breakpoint: { max: 899, min: 600 },
    items: 5,
    slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 599, min: 0 },
    items: 3,
    slidesToSlide: 2,
  },
};
