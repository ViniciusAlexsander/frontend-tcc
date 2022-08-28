import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface MovieCardProps {
  movie: movie;
}

type movie = {
  poster_path: string | null;
  title: string;
  id: number;
  vote_average: number;
};

export function CardFilme({ movie }: MovieCardProps) {
  return (
    <Box
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
    </Box>
  );
}
