import React, { useEffect, useMemo, useState } from "react";
import debounce from 'lodash.debounce';
import { Grid } from "@mui/material";
import { HeaderBuscarFilmes, CardFilme } from "../../shared/components";
import { getSearchMovies, searchMovie } from "../../services/movies/searchMovies";
import { getPopularMovies, popularMovie } from "../../services/movies/popularMovies";

export default function Filmes() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [movies, setMovies] = useState<searchMovie[] | popularMovie[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async (page: number, search: string | null) => {
    const {searchMovies, totalResults} = await getSearchMovies(page, search);
    setTotalResults(totalResults);
    setMovies(searchMovies);
  }

  useEffect(() => {
    console.log("useEffect");
    getMovies(page, search);
  }, [page, search]);

  const handleSearch = (search: string | null) => {
    setSearch(search);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderBuscarFilmes handleSearch={handleSearch} search={search} />
      </Grid>

      {movies && movies.map((movie) => (
        <Grid item xs={12} sm={2}>
          <CardFilme
            key={movie.id}
            movie={{
              ...movie,
            }}
          />
        </Grid>
      ))}
      
    </Grid>
  );
}
