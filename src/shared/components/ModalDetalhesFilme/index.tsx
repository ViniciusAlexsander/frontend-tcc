import {
  Grid,
  Typography,
  Dialog,
  Box,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, ArrowRight, FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
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
  const theme = useTheme();

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
                alignItems: "center",
                maxWidth: "80%",
              }}
            >
              <Typography variant="h5" fontWeight="bold" lineHeight="1">
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
                <FavoriteBorder fontSize="medium" htmlColor="#fff" />
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
                <Add htmlColor="#fff" fontSize="medium" />
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
                {movie.vote_average}
              </Typography>
            </Box>
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
              {findGenresNamesByIds(movie.genre_ids)}
            </Typography>
          </Grid>
          <Grid container item xs={12} mt={{ xs: 1, sm: 2 }}>
            <Typography variant="body2" textAlign="justify">
              {movie.overview}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              sx={{ ":hover": { backgroundColor: "#353FA0" } }}
              variant="contained"
              size="medium"
              endIcon={<ArrowRight />}
            >
              Ver Mais
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
