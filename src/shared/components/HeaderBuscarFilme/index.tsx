import React, { useState } from "react";
import {
  Typography,
  Grid,
  IconButton,
  IconButtonProps,
  Collapse,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { DatePicker, TituloComIcone } from "../";
import { sortByOptions } from "../../utils/movieDiscover";
import { movieProvidersOptions } from "../../utils/movieProviders";
import { movieGenres } from "../../utils/movieGenres";

interface HeaderBuscarFilmesProps {
  handleClickSort: () => void;
  handleClickClean: () => void;
  handleClickFilter: () => void;
  totalResults: number;
  search: string | null;
  handleSearch: (search: string | null) => void;
  sortBy: string | null;
  handleSortBy: (sortBy: string | null) => void;
  providers: string[];
  handleProviders: (provider: string[]) => void;
  genders: string[];
  handleGenders: (genders: string[]) => void;
  releaseYear: Date | null;
  handleReleaseYear: (releaseYear: Date | null) => void;
}

export function HeaderBuscarFilmes({
  handleClickClean,
  handleClickFilter,
  handleClickSort,
  search,
  handleSearch,
  sortBy,
  handleSortBy,
  providers,
  handleProviders,
  genders,
  handleGenders,
  releaseYear,
  handleReleaseYear,
  totalResults,
}: HeaderBuscarFilmesProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <Grid item xs={12}>
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
      <Grid
        item
        xs={12}
        my={2}
        justifyContent="space-between"
        display="flex"
        alignItems="center"
      >
        <Box
          justifyContent="flex-start"
          display="flex"
          alignItems="center"
          onClick={handleExpandClick}
        >
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ marginRight: 2 }}
          >
            <ExpandMoreIcon />{" "}
          </ExpandMore>
          <Typography variant="body1" fontWeight="bold">
            Busca avançada
          </Typography>
        </Box>
        <Typography variant="body2">
          Resultados encontrados: {totalResults}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="genders-label">Gêneros</InputLabel>
                <Select
                  labelId="genders-label"
                  id="genders"
                  multiple
                  value={genders}
                  label="Gêneros"
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

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="providers-label">Exibido em</InputLabel>
                <Select
                  labelId="providers-label"
                  id="providers"
                  multiple
                  value={providers}
                  label="Exibido em"
                  onChange={(e) => {
                    const {
                      target: { value },
                    } = e;
                    handleProviders(
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
                  {movieProvidersOptions.map((s) => (
                    <MenuItem key={s.provider_id} value={s.provider_name}>
                      {s.provider_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="ordenar-por-label">Ordenar por</InputLabel>
                <Select
                  labelId="ordenar-por-label"
                  id="ordenar-por"
                  value={sortBy}
                  label="Ordenar por"
                  onChange={(e) => {
                    handleSortBy(e.target.value);
                  }}
                >
                  {sortByOptions.map((s) => (
                    <MenuItem key={s.label} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                datePickerValue={releaseYear}
                setDatePickerValue={handleReleaseYear}
                textFieldProps={{
                  fullWidth: true,
                  label: "Ano lançamento",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
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
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleClickSort}
                >
                  Sortear
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleClickClean}
                >
                  Limpar
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleClickFilter}
                >
                  Filtrar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
