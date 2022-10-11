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
import { movieGenres } from "../../utils/movieGenres";

interface HeaderMeusFilmesProps {
  handleClickClean: () => void;
  handleClickFilter: () => void;
  totalResults: number;
  search: string | null;
  handleSearch: (search: string | null) => void;
  genders: string[];
  handleGenders: (genders: string[]) => void;
}

export function HeaderMeusFilmes({
  handleClickClean,
  handleClickFilter,
  search,
  handleSearch,
  genders,
  handleGenders,
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
      <Grid item xs={12}>
        <TituloComIcone
          titulo="Pesquise ou descubra um novo filme"
          icon={<Search />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          size="medium"
          fullWidth
          label="Digite o nome de um filme"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="status-label">Status do filme</InputLabel>
          <Select
            labelId="status-label"
            multiple
            value={genders}
            label="Status do filme"
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              handleGenders(
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
            {movieGenres.map((s) => (
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
