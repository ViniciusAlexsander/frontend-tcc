import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import {
  HeaderBuscarFilmes,
  CardFilme,
  CardInformativo,
} from "../../shared/components";
import { SentimentVeryDissatisfied, Search } from "@mui/icons-material";
import { getDiscoverMovies } from "../../services/movies/discoverMovies";
import { getSearchMovies } from "../../services/movies/searchMovies";
import { sortByOptions } from "../../shared/utils/movieDiscover";
import { getRandomInt, randomYear } from "../../shared/utils/utils";
import { movieGenres } from "../../shared/utils/movieGenres";
import { LoadingButton } from "@mui/lab";
import { IMovie } from "../../shared/models/movies/IMovie";

export default function Filmes() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value);
  const [providers, setProviders] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [releaseYear, setReleaseYear] = useState<Date | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [isRandomFilm, setIsRandomFilm] = useState(false);

  const getMovies = async (
    page: number,
    sortBy: string | null,
    providers: string[],
    genders: string[],
    releaseYear: Date | null,
    randomFilm: boolean = false
  ) => {
    setIsRandomFilm(randomFilm);
    if (page === 1) setLoading(true);
    const { discoverMovies, totalResults, totalPages } =
      await getDiscoverMovies({
        page,
        sortBy,
        providers,
        genders,
        releaseYear: releaseYear ? new Date(releaseYear).getFullYear() : null,
      });
    if (randomFilm) setMovies([discoverMovies[1]]);
    else setMovies(page > 1 ? movies.concat(discoverMovies) : discoverMovies);
    setTotalResults(totalResults);
    setTotalPages(totalPages);
    setLoading(false);
    setLoadingButton(false);
  };

  const getSearchMoviesFunc = async (page: number, search: string | null) => {
    if (page === 1) setLoading(true);
    const { searchMovies, totalResults, totalPages } = await getSearchMovies({
      page,
      search,
    });
    setMovies(page > 1 ? movies.concat(searchMovies) : searchMovies);
    setTotalResults(totalResults);
    setTotalPages(totalPages);
    setLoading(false);
    setLoadingButton(false);
  };

  useEffect(() => {
    getMovies(page, sortBy, providers, genders, releaseYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (search) getSearchMoviesFunc(1, search);
    else getMovies(page, sortBy, providers, genders, releaseYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = (search: string | null) => {
    setSearch(search);
  };

  const handleSortBy = (sortBy: string | null) => {
    setSortBy(sortBy);
  };

  const handleProviders = (providers: string[]) => {
    setProviders(providers);
  };

  const handleGenders = (genders: string[]) => {
    setGenders(genders);
  };

  const handleReleaseYear = (releaseYear: Date | null) => {
    setReleaseYear(releaseYear);
  };

  const handleClickSort = () => {
    let randomGender = [movieGenres[getRandomInt(0, movieGenres.length)].name];
    let randomYearResult = randomYear();
    setGenders(randomGender);
    setReleaseYear(randomYearResult);
    setPage(1);
    getMovies(
      page,
      sortByOptions[0].value,
      providers,
      randomGender,
      randomYearResult,
      true
    );
  };

  const handleClickClean = () => {
    setSortBy(sortByOptions[0].value);
    setProviders([]);
    setGenders([]);
    setReleaseYear(null);
    setPage(1);
    getMovies(page, sortByOptions[0].value, [], [], null);
  };

  const handleClickFilter = () => {
    setPage(1);
    getMovies(1, sortBy, providers, genders, releaseYear);
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <HeaderBuscarFilmes
          handleClickClean={handleClickClean}
          handleClickFilter={handleClickFilter}
          handleClickSort={handleClickSort}
          handleSearch={handleSearch}
          search={search}
          handleSortBy={handleSortBy}
          sortBy={sortBy}
          providers={providers}
          handleProviders={handleProviders}
          genders={genders}
          handleGenders={handleGenders}
          releaseYear={releaseYear}
          handleReleaseYear={handleReleaseYear}
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
      {!(totalPages === page) && movies && movies.length > 0 && !isRandomFilm && (
        <Grid
          item
          xs={12}
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LoadingButton
            variant="contained"
            size="large"
            onClick={() => {
              setLoadingButton(true);
              setPage(page + 1);
            }}
            loading={loadingButton}
            loadingPosition="start"
            startIcon={<Search />}
          >
            Carregar mais
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  );
}
