import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import {
  Grid,
  Typography,
  Dialog,
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
  Autocomplete,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AddCircleOutlineSharp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { getSearchMovies } from "../../../services/movies/searchMovies";
import { createGroupSession } from "../../../services/bff/session";

export interface ModalNovaSessaoProps {
  open: boolean;
  groupId: string;
  handleClose: () => void;
}

export interface IMovieOptions {
  id: number;
  label: string;
}

export function ModalNovaSessao({
  open,
  groupId,
  handleClose,
}: ModalNovaSessaoProps) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useState<string | undefined>(undefined);
  const [movies, setMovies] = useState<IMovieOptions[]>([]);
  const [movie, setMovie] = useState<IMovieOptions | undefined>(undefined);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });
  const [dateTime, setDateTime] = useState<Dayjs | null>(null);

  const handleChangeDateTime = (dateTime: Dayjs | null) => {
    setDateTime(dateTime);
  };

  const findMovieService = async (search: string | undefined) => {
    try {
      setLoading(true);
      const { searchMovies } = await getSearchMovies({
        page: 1,
        search,
      });
      setMovies(
        searchMovies.map((movie) => {
          return { id: movie.id, label: movie.title };
        })
      );
    } catch (error) {
      setAlert({
        open: true,
        message: "Ocorreu um erro ao buscar pelo filme",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClickCreateSession = async (
    movieId: number,
    assistedInId: string
  ) => {
    try {
      setLoadingButton(true);
      if (dateTime)
        await createGroupSession({
          groupId,
          movieId: movieId.toString(),
          assistedInId,
          sessionDay: dateTime,
        });

      setAlert({
        message: "Sessão criada com sucesso",
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Erro ao criar sessão, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
      setSearchMovie(null);
      handleCloseModal();
    }
  };

  const handleCloseAlert = () => {
    setAlert({ message: "", open: false, severity: "success" });
  };

  const handleCloseModal = () => {
    setMovie(undefined);
    setDateTime(null);
    handleClose();
  };

  useEffect(() => {
    if (searchMovie) findMovieService(searchMovie);
  }, [searchMovie]);

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={alert.severity}
          sx={{ width: "100%" }}
          onClose={handleCloseAlert}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleCloseModal}>
        <Grid container maxWidth="480px" spacing={1} p={2}>
          <Grid item xs={12} display="flex" justifyContent="flex-start">
            <Typography variant="h5" fontWeight="bold">
              Configurar sessão
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-start">
            <Typography variant="body1" pt={2}>
              Filme a ser assistido na sessão
            </Typography>
          </Grid>
          <Grid item xs={12} pb={3}>
            <Autocomplete
              options={movies}
              value={movie}
              onChange={(_, option: IMovieOptions) => setMovie(option)}
              onInputChange={(_, searchValue) => {
                setSearchMovie(searchValue);
              }}
              inputValue={searchMovie}
              isOptionEqualToValue={(
                option: IMovieOptions,
                value: IMovieOptions
              ) => option?.id === value?.id}
              noOptionsText="Não foi encontrado um filme com o nome buscado"
              loading={loading}
              loadingText="Buscando..."
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Digite o nome do filme"
                  required
                  size="medium"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} pb={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="pt-br">
              <DateTimePicker
                label="Escolha a data e hora da sessão"
                value={dateTime}
                onChange={handleChangeDateTime}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LoadingButton
              variant="contained"
              fullWidth
              disabled={!movie || !dateTime}
              size="large"
              onClick={() => {
                handleClickCreateSession(movie.id, "");
              }}
              loading={loadingButton}
              loadingPosition="start"
              startIcon={<AddCircleOutlineSharp />}
            >
              Criar sessão
            </LoadingButton>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
