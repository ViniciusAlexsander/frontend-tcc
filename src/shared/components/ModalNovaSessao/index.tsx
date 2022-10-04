import { useEffect, useState } from "react";
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
import { GroupAdd } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { findUsers } from "../../../services/bff/findUsers";
import { addUserInGroup } from "../../../services/bff/addUserInGroup";
import { IMovie } from "../../models/movies/IMovie";
import { getSearchMovies } from "../../../services/movies/searchMovies";

export interface ModalNovaSessaoProps {
  open: boolean;
  handleClose: () => void;
  groupId: string;
}

export interface IMovieOptions {
  id: number;
  label: string;
}

export function ModalNovaSessao({
  handleClose,
  open,
  groupId,
}: ModalNovaSessaoProps) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState<string | null>(null);
  const [movies, setMovies] = useState<IMovieOptions[]>([]);
  const [movie, setMovie] = useState<IMovieOptions | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });

  const findUsersService = async (search: string | null) => {
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
        message: "Ocorreu um erro ao buscar usuário",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClickAddUsuario = async (userId: number) => {
    try {
      setLoadingButton(true);
      console.log({ groupId, userId });
      setAlert({
        message: "Membro adicionado com sucesso",
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message:
          "Erro ao adicionar membro ao grupo, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ message: "", open: false, severity: "success" });
    setSearchUser(null);
    handleClose();
  };

  useEffect(() => {
    if (searchUser) findUsersService(searchUser);
  }, [searchUser]);

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
      <Dialog open={open} onClose={handleClose}>
        <Grid container maxWidth="480px" spacing={2} p={2}>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" fontWeight="bold">
              Adicionar novo usuário
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={movies}
              value={movie}
              onChange={(_, option: IMovieOptions) => setMovie(option)}
              onInputChange={(_, searchValue) => {
                setSearchUser(searchValue);
              }}
              inputValue={searchUser}
              isOptionEqualToValue={(
                option: IMovieOptions,
                value: IMovieOptions
              ) => option.id === value.id}
              noOptionsText="Digite o username do membro"
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Busque por username do membro"
                  required
                  size="medium"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="contained" size="large" onClick={handleClose}>
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
              disabled={!movie}
              size="large"
              onClick={() => {
                handleClickAddUsuario(movie.id);
              }}
              loading={loadingButton}
              loadingPosition="start"
              startIcon={<GroupAdd />}
            >
              Adicionar usuário
            </LoadingButton>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
