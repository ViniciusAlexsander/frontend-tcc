import React from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { Grid, Typography, Stack, Box } from "@mui/material";
import {
  getMovieDetails,
  IMovieDetails,
} from "../../services/movies/movieDetails";
import { minutosParaHoras } from "../../shared/utils/utils";
import {
  getMovieProvidersDetails,
  IMovieProviders,
} from "../../services/movies/movieProviders";

interface DetalheFilmeProps {
  movieDetails: IMovieDetails;
  movieProviders: IMovieProviders;
}

export default function DetalheFilme({
  movieDetails,
  movieProviders,
}: DetalheFilmeProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            alt={"Poster do filme" + movieDetails.title}
            src={movieDetails.poster_path}
            width="300px"
            height="450px"
            style={{ borderRadius: "8px 8px 0px 0px" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="baseline">
            <Typography variant="h4" fontWeight="bold">
              {movieDetails.title}
            </Typography>
            <Typography variant="h5">
              ({new Date(movieDetails.release_date).getFullYear()})
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="baseline">
            <Typography variant="body1" fontWeight="bold">
              {movieDetails.genres.map((gender) => gender.name).join(", ")}
            </Typography>
            <Typography variant="body1">
              {minutosParaHoras(movieDetails.runtime)}
            </Typography>
          </Stack>

          <Typography variant="body1" fontStyle="italic">
            {movieDetails.tagline}
          </Typography>
          <Stack direction="column" spacing={2} alignItems="baseline">
            <Typography variant="h6">Sinopse</Typography>
            <Typography variant="body1" fontWeight="400">
              {movieDetails.overview}
            </Typography>
          </Stack>
          {movieProviders?.flatrate && (
            <Stack direction="column" spacing={2} alignItems="baseline">
              <Typography variant="h6">Stream</Typography>
              <Stack>
                {movieProviders?.flatrate.map((stream) => (
                  <Image
                    key={stream.provider_id}
                    alt={"Logo do provider" + stream.provider_name}
                    src={stream.logo_path}
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "4px" }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
          {movieProviders.rent && (
            <Stack direction="column" spacing={2} alignItems="baseline">
              <Typography variant="h6">Comprar</Typography>
              <Typography variant="body1" fontWeight="400">
                {movieDetails.overview}
              </Typography>
            </Stack>
          )}
          {movieProviders.buy && (
            <Stack direction="column" spacing={2} alignItems="baseline">
              <Typography variant="h6">Comprar</Typography>
              <Typography variant="body1" fontWeight="400">
                {movieDetails.overview}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const { id } = params;

  const { movieDetails } = await getMovieDetails(id as string);
  const movieProviders = await getMovieProvidersDetails(id as string);

  return {
    props: {
      movieDetails: JSON.parse(JSON.stringify(movieDetails)),
      movieProviders: JSON.parse(JSON.stringify(movieProviders)),
    },
  };
};
