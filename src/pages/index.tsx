import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField, Grid, Typography, Link } from "@mui/material";
import { Carousel, MenuLateral } from "../shared/components";

export default function Home() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Box>
      <Carousel responsive={responsive} titulo="Novos filmes">
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "red" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
        <Box sx={{ width: 200, height: 200, backgroundColor: "#707070" }}>
          Teste
        </Box>
      </Carousel>
      <Typography>Teste testeTeste testeTeste teste</Typography>
    </Box>
  );
}
