import { Grid, Typography, Dialog, Box, Button } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import Image from "next/image";

interface ModalDetalhesFilmeProps {
  movie: movie;
  open: boolean;
}

type movie = {
  poster_path: string | null;
  banner_path: string | null;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export function ModalDetalhesFilme({ movie, open }: ModalDetalhesFilmeProps) {
  console.log(movie.banner_path);
  return (
    <Dialog open={open}>
      <Box sx={{ backgroundColor: "#595959" }}>
        <Image
          alt={"poster do filme" + movie.title}
          src={movie.banner_path}
          width="600px"
          height="200px"
          style={{ borderRadius: "8px 8px 0px 0px" }}
        />
        <Grid container px={2} py={1}>
          <Grid container item xs={8}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" fontWeight="bold" mr={1}>
                {movie.title}
              </Typography>
              <Typography variant="body1">
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mr={2}
              >
                <Typography variant="body1" fontWeight="bold" mr={1}>
                  Duração:
                </Typography>
                <Typography variant="body1">2h 30min</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1" fontWeight="bold" mr={1}>
                  Popularidade:
                </Typography>
                <Typography variant="body1">{movie.vote_average}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid container item xs={3}>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Genêro: <span>{movie.genre_ids[1]}</span>
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Atores:
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} mt={4}>
            <Typography variant="body1" fontWeight="bold">
              {movie.overview}
            </Typography>
          </Grid>
          <Grid
            container
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
