import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { HeaderBuscarFilmes, CardFilme } from "../../shared/components";
import {
  getSearchMovies,
  searchMovie,
} from "../../services/movies/searchMovies";
import { popularMovie } from "../../services/movies/popularMovies";
import { sortByOptions } from "../../shared/utils/movieDiscover";

export default function Filmes() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value);
  const [providers, setProviders] = useState<string[]>([]);
  const [movies, setMovies] = useState<searchMovie[] | popularMovie[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async (
    page: number,
    search: string | null,
    sortBy: string | null,
    providers: string[]
  ) => {
    const { searchMovies, totalResults } = await getSearchMovies(
      page,
      search,
      sortBy,
      providers
    );
    setTotalResults(totalResults);
    setMovies(searchMovies);
  };

  useEffect(() => {
    console.log("useEffect");
    getMovies(page, search, sortBy, providers);
  }, [page, search, sortBy, providers]);

  const handleSearch = (search: string | null) => {
    setSearch(search);
  };

  const handleSortBy = (sortBy: string | null) => {
    setSortBy(sortBy);
  };

  const handleProviders = (providers: string[]) => {
    setProviders(providers);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderBuscarFilmes
          handleSearch={handleSearch}
          search={search}
          handleSortBy={handleSortBy}
          sortBy={sortBy}
          providers={providers}
          handleProviders={handleProviders}
        />
      </Grid>

      {movies &&
        movies.map((movie) => (
          <Grid item xs={12} sm={2} key={movie.id}>
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
