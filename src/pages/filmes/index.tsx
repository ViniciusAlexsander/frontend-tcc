import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { HeaderBuscarFilmes, CardFilme } from "../../shared/components";
import {
  getDiscoverMovies,
  IDiscoverMovie,
} from "../../services/movies/discoverMovies";
import { popularMovie } from "../../services/movies/popularMovies";
import { sortByOptions } from "../../shared/utils/movieDiscover";
import { Dayjs } from "dayjs";

export default function Filmes() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value);
  const [providers, setProviders] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [releaseYear, setReleaseYear] = useState<Date | null>(null);
  const [movies, setMovies] = useState<IDiscoverMovie[] | popularMovie[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async (
    page: number,
    search: string | null,
    sortBy: string | null,
    providers: string[],
    genders: string[],
    releaseYear: Date | null
  ) => {
    const { discoverMovies, totalResults } = await getDiscoverMovies({
      page,
      search,
      sortBy,
      providers,
      genders,
      releaseYear: releaseYear ? new Date(releaseYear).getFullYear() : null,
    });
    setTotalResults(totalResults);
    setMovies(discoverMovies);
  };

  useEffect(() => {
    getMovies(page, search, sortBy, providers, genders, releaseYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleClickSort = () => {};
  const handleClickClean = () => {
    setSortBy(sortByOptions[0].value);
    setProviders([]);
    setGenders([]);
    setReleaseYear(null);
    getMovies(page, search, sortByOptions[0].value, [], [], null);
  };
  const handleClickFilter = () => {
    getMovies(page, search, sortBy, providers, genders, releaseYear);
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

      {movies &&
        movies.map((movie) => (
          <Grid item xs={6} sm={3} lg={2} xl={1.5} key={movie.id} mt={2}>
            <CardFilme
              movie={{
                ...movie,
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
}
