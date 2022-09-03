import { Box, Typography, CardActionArea } from "@mui/material";
import { ModalDetalhesFilme } from "../";
import Image from "next/image";
import { useState } from "react";

interface MovieCardProps {
  movie: movie;
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

export function CardFilme({ movie }: MovieCardProps) {
  const [openModalDetalhes, setOpenModalDetalhes] = useState<boolean>(false);

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
      />
      <CardActionArea
        onClick={handleClickCard}
        sx={{
          width: "150px",
          borderRadius: "0px 0px 8px 8px",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          marginLeft: "21px",
        }}
      >
        <div>
          <Image
            alt={"poster do filme" + movie.title}
            src={movie.poster_path}
            width="150px"
            height="225px"
            style={{ borderRadius: "8px 8px 0px 0px" }}
          />
          <Typography variant="body2">Nota: {movie.vote_average}</Typography>
        </div>
        <Typography variant="body1" fontWeight="bold">
          {movie.title}
        </Typography>
      </CardActionArea>
    </>
  );
}
