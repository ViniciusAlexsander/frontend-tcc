import {
  Grid,
  Typography,
  Dialog,
  Box,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
  AlertColor,
} from "@mui/material";
import { GroupAddSharp } from "@mui/icons-material";
import Image from "next/image";
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
  participants: IParticipants[];
};

type IParticipants = {
  id: string;
  name: string;
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
      <Box sx={{ backgroundColor: "#595959" }}>
        <Image
          alt={"poster do filme" + movie.title}
          src={movie.backdrop_path}
          width="600px"
          height="240px"
          style={{ borderRadius: "8px 8px 0px 0px" }}
        />
        <Grid container px={{ xs: 1, sm: 2 }} py={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} sm={8}>
            <Box display="flex" alignItems="flex-end" mr={2}>
              <Typography variant="h5" fontWeight="bold" mr={3}>
                {movie.title}
              </Typography>
              <Typography variant="body1">
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
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
            alignItems={{ xs: "center", sm: "flex-start" }}
            flexDirection={{ xs: "row", sm: "column" }}
            justifyContent={{ xs: "start" }}
          >
            <Typography variant="body1" mr={{ xs: 3, sm: 0 }}>
              <strong>Genêro: </strong>
              {movie.genre_ids && findGenresNamesByIds(movie.genre_ids)}
              {movie.genres &&
                movie.genres.map((gender) => gender.name).join(", ")}
            </Typography>

            {/* <Typography variant="body1">
              <strong>Atores: </strong>Tom roland
            </Typography> */}
          </Grid>
          <Grid container item xs={12} mt={{ xs: 2, sm: 4 }}>
            <Typography variant="body2">{movie.overview}</Typography>
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
                  {session?.participants?.length > 0 &&
                    session?.participants.map((participant) => (
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
                          {...stringAvatar(participant.name)}
                          sx={{
                            bgcolor: stringToColor(participant.name),
                            width: { xs: 60, sm: 80 },
                            height: { xs: 60, sm: 80 },
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                            marginBottom: 2,
                          }}
                        />
                        <Typography variant="body1" textAlign="center">
                          {participant.name}
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
