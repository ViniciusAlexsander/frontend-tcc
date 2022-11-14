import { Grid, Typography, Dialog, Button } from "@mui/material";

export interface ModalConfirmacaoProps {
  open: boolean;
  titulo: string;
  descricao: string;
  handleClose: () => void;
  handleConfirmacao: () => void;
}

export function ModalConfirmacao({
  open,
  titulo,
  descricao,
  handleClose,
  handleConfirmacao,
}: ModalConfirmacaoProps) {
  const handleCloseModal = () => {
    handleClose();
  };

  const handleClickConfirmacao = () => {
    handleConfirmacao();
    handleCloseModal();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal}>
        <Grid container maxWidth="480px" spacing={1} p={2}>
          <Grid item xs={12} display="flex" justifyContent="flex-start">
            <Typography variant="h5" fontWeight="bold">
              {titulo}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="body1">{descricao}</Typography>
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
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleClickConfirmacao}
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
