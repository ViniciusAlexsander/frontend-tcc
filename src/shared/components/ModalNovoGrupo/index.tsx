import { Grid, Typography, Dialog, Box, Button } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

export interface ModalNovoGrupoProps {
  open: boolean;
  handleClose: () => void;
}

type movie = {
  poster_path: string | null;
  banner_path: string | null;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export function ModalNovoGrupo({ handleClose, open }: ModalNovoGrupoProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid container width="30vw">
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" fontWeight="bold">
            Novo grupo
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
}
