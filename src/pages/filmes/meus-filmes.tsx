import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import {
  CardFilme,
  CardInformativo,
  HeaderMeusFilmes,
} from "../../shared/components";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { withSSRAuth } from "../../shared/utils/withSSRAuth";
import { getUserMovies, IUserMovies } from "../../services/bff/getUserMovies";

export default function MeusFilmes() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [moviesStatus, setMoviesStatus] = useState<string[]>([]);
  const [movies, setMovies] = useState<IUserMovies[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  const getSearchMoviesFunc = async (
    search: string | undefined,
    moviesStatus: string[]
  ) => {
    setLoading(true);
    const movies = await getUserMovies({
      search,
      moviesStatus,
    });
    setMovies(movies);
    setTotalResults(movies.length);
    setLoading(false);
  };

  useEffect(() => {
    getSearchMoviesFunc(search, moviesStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (search: string | null) => {
    setSearch(search);
  };

  const handleMoviesStatus = (moviesStatus: string[]) => {
    setMoviesStatus(moviesStatus);
  };

  const handleClickClean = () => {
    setSearch(undefined);
    setMoviesStatus([]);
    getSearchMoviesFunc(undefined, []);
  };

  const handleClickFilter = () => {
    getSearchMoviesFunc(search, moviesStatus);
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <HeaderMeusFilmes
          handleClickClean={handleClickClean}
          handleClickFilter={handleClickFilter}
          handleSearch={handleSearch}
          search={search}
          moviesStatus={moviesStatus}
          handleMoviesStatus={handleMoviesStatus}
          totalResults={totalResults}
        />
      </Grid>

      {loading ? (
        <Grid
          item
          xs={12}
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <Grid item xs={6} sm={3} lg={2} xl={1.5} key={movie.id} mt={2}>
                <CardFilme
                  movie={{
                    ...movie,
                  }}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} mt={2}>
              <CardInformativo
                mensagem={
                  "Nenhum filme encontrado com os parâmetros informados"
                }
                tipo="info"
                icon={<SentimentVeryDissatisfied />}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return { props: {} };
});
