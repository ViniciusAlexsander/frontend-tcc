import { Box, Typography, CardActionArea, useTheme } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface CardCastProps {
  cast: ICast;
}

type ICast = {
  adult: boolean;
  gender: number | null;
  id: number;
  original_name: string;
  character: string;
  profile_path: string | null;
};

export function CardCast({ cast }: CardCastProps) {
  const theme = useTheme();

  return (
    <>
      <CardActionArea
        sx={{
          width: "150px",
          borderRadius: "8px",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "21px",
          // backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          cursor: "default",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box>
            <Image
              alt={"Imagem de perfil do" + cast.original_name}
              src={cast.profile_path}
              width="150px"
              height="225px"
              style={{ borderRadius: "8px 8px 0px 0px" }}
            />
            <Typography variant="body1" fontWeight="bold" p={0.5}>
              {cast.original_name}
            </Typography>
          </Box>
          <Typography variant="body2" p={0.5}>
            {cast.character}
          </Typography>
        </Box>
      </CardActionArea>
    </>
  );
}
