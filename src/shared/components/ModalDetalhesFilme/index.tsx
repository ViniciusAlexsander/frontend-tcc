import { Grid, Typography, Dialog, Box, Button } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import { findGenresNamesByIds } from "../../utils/movieGenres";

interface ModalDetalhesFilmeProps {
  movie: movie;
  open: boolean;
  handleClose: () => void;
}

type movie = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export function ModalDetalhesFilme({
  movie,
  open,
  handleClose,
}: ModalDetalhesFilmeProps) {
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
        <Grid container px={2} py={1}>
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
                {movie.vote_average}
              </Typography>
            </Box>
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
              {findGenresNamesByIds(movie.genre_ids)}
            </Typography>

            {/* <Typography variant="body1">
              <strong>Atores: </strong>Tom roland
            </Typography> */}
          </Grid>
          <Grid container item xs={12} mt={{ xs: 2, sm: 4 }}>
            <Typography variant="body2">{movie.overview}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button variant="contained" size="medium" endIcon={<ArrowRight />}>
              Ver Mais
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
