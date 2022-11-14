import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { TituloComIcone } from "../";
import { movieStatus } from "../../utils/movieStatus";

interface HeaderMeusFilmesProps {
  handleClickClean: () => void;
  handleClickFilter: () => void;
  totalResults: number;
  search: string | null;
  handleSearch: (search: string | null) => void;
  moviesStatus: string[];
  handleMoviesStatus: (moviesStatus: string[]) => void;
}

export function HeaderMeusFilmes({
  handleClickClean,
  handleClickFilter,
  search,
  handleSearch,
  moviesStatus,
  handleMoviesStatus,
  totalResults,
}: HeaderMeusFilmesProps) {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 50 * 4.5 + 8,
      },
    },
  };

  return (
    <Grid container spacing={2}>
        <TituloComIcone
          titulo="PESQUISE EM SUA LISTA DE FILMES"
          icon={<Search />}
        />
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="status-label">Status do filme</InputLabel>
          <Select
            labelId="status-label"
            multiple
            value={moviesStatus}
            label="Status do filme"
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              handleMoviesStatus(
                typeof value === "string" ? value.split("|") : value
              );
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {movieStatus.map((s) => (
              <MenuItem key={s.id} value={s.name}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={6}
        my={2}
        justifyContent="space-between"
        display="flex"
        alignItems="center"
      >
        <Typography variant="body2">
          Resultados encontrados: {totalResults}
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        justifyContent="flex-end"
        display="flex"
        alignItems="center"
      >
        <Box
          sx={{
            "& button": {
              marginLeft: 3,
            },
          }}
        >
          <Button variant="contained" size="medium" onClick={handleClickClean}>
            Limpar
          </Button>
          <Button variant="contained" size="medium" onClick={handleClickFilter}>
            Filtrar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
