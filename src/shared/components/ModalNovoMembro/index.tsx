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

export interface ModalNovoMembroProps {
  open: boolean;
  handleClose: () => void;
  groupId: string;
}

export interface IUsersOptions {
  id: string;
  label: string;
}

export function ModalNovoMembro({
  handleClose,
  open,
  groupId,
}: ModalNovoMembroProps) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState<string | null>(null);
  const [users, setUsers] = useState<IUsersOptions[]>([]);
  const [user, setUser] = useState<IUsersOptions | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });

  const findUsersService = async (searchUser: string | null) => {
    try {
      setLoading(true);
      const users = await findUsers();
      setUsers(
        users.map((user) => {
          return { id: user.id, label: user.userName };
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

  const handleClickAddUsuario = async (userId: string) => {
    try {
      setLoadingButton(true);
      await addUserInGroup({ groupId, userId });
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
        <Grid container maxWidth="450px" spacing={2} p={2}>
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
              options={users}
              value={user}
              onChange={(_, option: IUsersOptions) => setUser(option)}
              onInputChange={(_, searchValue) => {
                setSearchUser(searchValue);
              }}
              inputValue={searchUser}
              isOptionEqualToValue={(
                option: IUsersOptions,
                value: IUsersOptions
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
              disabled={!user}
              size="large"
              onClick={() => {
                handleClickAddUsuario(user.id);
              }}
              loading={loadingButton}
              loadingPosition="start"
              startIcon={<GroupAdd />}
            >
              Carregar mais
            </LoadingButton>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
function setLoadingButton(arg0: boolean) {
  throw new Error("Function not implemented.");
}
