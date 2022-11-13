import { useState } from "react";
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
} from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { postNewGroup } from "../../../services/bff/group";

export interface ModalNovoGrupoProps {
  open: boolean;
  handleClose: () => void;
}

export function ModalNovoGrupo({ handleClose, open }: ModalNovoGrupoProps) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({ message: "", open: false, severity: "success" });

  const handleClickAddGroup = async () => {
    try {
      setLoadingButton(true);
      await postNewGroup({ title, description });
      setAlert({
        message: "Grupo criado com sucesso",
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Erro ao criar o grupo, tente novamente mais tarde",
        open: true,
        severity: "error",
      });
    } finally {
      setLoadingButton(false);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setAlert({ message: "", open: false, severity: "success" });
    setDescription(null);
    setTitle(null);
    handleClose();
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleCloseModal}>
        <Grid
          container
          maxWidth="450px"
          spacing={2}
          p={2}
          sx={{ backgroundColor: "#1c1c1c" }}
        >
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" fontWeight="bold">
              Crie um novo grupo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              size="medium"
              fullWidth
              label="Nome do grupo"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              size="medium"
              fullWidth
              label="Descrição"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
              size="large"
              fullWidth
              disabled={!title || !description}
              onClick={handleClickAddGroup}
              loading={loadingButton}
              loadingPosition="start"
              startIcon={<GroupAdd />}
            >
              Criar grupo
            </LoadingButton>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
