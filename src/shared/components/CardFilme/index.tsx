import { Box, Typography, CardActionArea, useTheme } from "@mui/material";
import { ModalDetalhesFilme } from "../";
import Image from "next/image";
import { useState } from "react";
import { IGenre } from "../../utils/movieGenres";

interface MovieCardProps {
  movie: IMovie;
  session?: ISessions;
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
  vote_average: number;
};
export function CardFilme({ movie, session }: MovieCardProps) {
  const [openModalDetalhes, setOpenModalDetalhes] = useState<boolean>(false);
  const theme = useTheme();

  const handleClickCard = () => {
    setOpenModalDetalhes(true);
  };
  const handleClose = () => {
    setOpenModalDetalhes(false);
  };
  return (
    <>
      <ModalDetalhesFilme
        open={openModalDetalhes}
        handleClose={handleClose}
        movie={{ ...movie }}
        session={{ ...session }}
      />
      <CardActionArea
        onClick={handleClickCard}
        sx={{
          width: "150px",
          borderRadius: "8px",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "flex-start",
          "&:hover": {
            boxShadow: "5px 5px 0 -2px rgba(53,63,160,1)",
            
          },
          color: theme.palette.primary.contrastText,
        }}
      >
        <Box display="flex" flexDirection='column' justifyContent="space-between" height='100%'>
          <Box>
            <Image
              alt={"Poster do filme" + movie.title}
              src={movie.poster_path}
              width="150px"
              height="225px"
              style={{ borderRadius: "8px 8px 0px 0px" }}
            />
            <Typography variant="body1" fontWeight="bold" p={0.5}>
              {movie.title}
            </Typography>
          </Box>
          <Typography variant="body2" p={0.5}>
            Nota: {movie.vote_average}
          </Typography>
        </Box>
      </CardActionArea>
    </>
  );
}
