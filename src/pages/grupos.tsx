import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { GroupAdd, People } from "@mui/icons-material";
import { ModalNovoGrupo, TituloComIcone } from "../shared/components";
import { CarouselGruposParticipa } from "../shared/components/CarouselGruposParticipa";

export default function Grupos() {
  const [openModalNovoGrupo, setOpenModalNovoGrupo] = useState<boolean>(false);

  const handleClickNovoGrupo = () => {
    setOpenModalNovoGrupo(true);
  };
  const handleClose = () => {
    setOpenModalNovoGrupo(false);
  };

  return (
    <>
      <ModalNovoGrupo open={openModalNovoGrupo} handleClose={handleClose} />
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <TituloComIcone titulo="Grupos" icon={<People />} />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            size="medium"
            startIcon={<GroupAdd />}
            onClick={handleClickNovoGrupo}
          >
            Novo grupo
          </Button>
        </Grid>

        <Grid item xs={12}>
          <CarouselGruposParticipa />
        </Grid>
      </Grid>
    </>
  );
}
