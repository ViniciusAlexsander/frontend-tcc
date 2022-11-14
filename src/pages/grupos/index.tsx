import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { GroupAdd, People, PersonSearch } from "@mui/icons-material";
import {
  ModalNovoGrupo,
  PesquisarGrupos,
  TituloComIcone,
} from "../../shared/components";
import { CarouselGruposParticipa } from "../../shared/components/CarouselGruposParticipa";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { RotasEnum } from "../../shared/utils/rotas";

export default function Grupos() {
  const [openModalNovoGrupo, setOpenModalNovoGrupo] = useState<boolean>(false);
  const [atualizarGrupos, setAtualizarGrupos] = useState<boolean>(false);

  const handleClickNovoGrupo = () => {
    setOpenModalNovoGrupo(true);
  };
  const handleClose = () => {
    setAtualizarGrupos(true);
    setOpenModalNovoGrupo(false);
  };

  return (
    <>
      <ModalNovoGrupo open={openModalNovoGrupo} handleClose={handleClose} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TituloComIcone titulo="GRUPOS" icon={<People />} />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" fontWeight={700}>
            Seus grupos
          </Typography>
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
          <CarouselGruposParticipa
            atualizarGrupos={atualizarGrupos}
            setAtualizarGrupos={setAtualizarGrupos}
          />
        </Grid>
        <Grid item xs={12}>
          <TituloComIcone
            titulo="Encontre novos grupos"
            icon={<PersonSearch />}
          />
        </Grid>
        <Grid item xs={12}>
          <PesquisarGrupos />
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (!cookies["nextauth.token"]) {
    return {
      redirect: {
        destination: RotasEnum.LOGIN,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
