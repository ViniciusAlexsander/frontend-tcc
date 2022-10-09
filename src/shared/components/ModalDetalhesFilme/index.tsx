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
} from "@mui/material";
import { GroupAddSharp } from "@mui/icons-material";
import React, { useState } from "react";
import { findGenresNamesByIds, IGenre } from "../../utils/movieGenres";
import { Carousel, ResponsiveType } from "../index";
import {
  stringAvatar,
  stringToColor,
  minutosParaHoras,
} from "../../utils/utils";
import { joinSession } from "../../../services/bff/session";
import { LoadingButton } from "@mui/lab";
import { Add, ArrowRight, FavoriteBorder } from "@mui/icons-material";

interface ModalDetalhesFilmeProps {
  movie: IMovie;
  session?: ISessions;
  open: boolean;
  handleClose: () => void;
}

type ISessions = {
  id: string;
  groupId: string;
  assistedInId: string;
  createdAt: Date;
  users: IUser[];
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
  handleClose,
  session,
}: ModalDetalhesFilmeProps) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const handleClickJoinSession = async (sessionId: string) => {
    try {
      setLoadingButton(true);
      await joinSession({ sessionId });
      setAlert({
        message: "Você entrou na sessão com sucesso",
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Erro ao entrar na sessão, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ backgroundColor: "#1a1a1a" }}>
        <Box
          sx={{
            backgroundImage: `url(${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
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
          >
            {/* TITULO E DATA */}
            <Box
              sx={{
                backgroundColor: "#1a1a1a",
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
                color="#FFEC5B"
              >
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            </Box>
            {/* BOTOES */}
            <Box>
              <IconButton
                sx={{
                  marginRight: "0.5rem",
                  padding: "5px",
                  backgroundColor: "#343434",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  ":hover": {
                    backgroundColor: "#1a1a1a",
                    borderColor: "rgba(255, 255, 255, 1)",
                  },
                }}
              >
                <FavoriteBorder fontSize="large" htmlColor="#fff" />
              </IconButton>
              <IconButton
                sx={{
                  padding: "5px",
                  backgroundColor: "#343434",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  ":hover": {
                    backgroundColor: "#1a1a1a",
                    borderColor: "rgba(255, 255, 255, 1)",
                  },
                }}
              >
                <Add htmlColor="#fff" fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Grid container padding="0.5rem 1rem 1rem 1rem">
          <Grid item xs={12} sm={8}>
            <Box display="flex" alignItems="flex-end" mr={2}>
              <Typography variant="body1" mr={3}>
                <strong>Título original: </strong>
                {movie.original_title}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="body1">
                <strong>Popularidade: </strong>
                {movie.popularity}
              </Typography>
            </Box>
            {movie.runtime && (
              <Box display="flex" alignItems="center">
                <Typography variant="body1">
                  <strong>Duração: </strong>
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
              <strong>Genêro: </strong>
              {movie.genre_ids && findGenresNamesByIds(movie.genre_ids)}
              {movie.genres &&
                movie.genres.map((gender) => gender.name).join(", ")}
            </Typography>
          </Grid>
          <Grid container item xs={12} mt={{ xs: 1, sm: 2 }}>
            <Typography variant="body2" textAlign="justify">
              {movie.overview}
            </Typography>
          </Grid>
          {session && session.id && (
            <>
              <Grid container item xs={12} mt={{ xs: 2, sm: 4 }}>
                <Carousel
                  titulo="Participantes"
                  responsive={responsive}
                  arrows
                  mostrarPontos={!isMobile}
                  mostrarProximo
                >
                  {session?.users?.length > 0 &&
                    session?.users.map((participant) => (
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
              </Grid>
              <Grid
                item
                xs={12}
                mt={{ xs: 1, sm: 3 }}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <LoadingButton
                  variant="contained"
                  size="large"
                  onClick={() => handleClickJoinSession(session.id)}
                  loading={loadingButton}
                  loadingPosition="start"
                  startIcon={<GroupAddSharp />}
                >
                  Participar da sessão
                </LoadingButton>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Dialog>
  );
}

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
