import React, { ReactElement } from "react";
import { Grid, Typography, Box, Divider } from "@mui/material";
import { People } from "@mui/icons-material";

export interface TituloComIconeProps {
  titulo: string;
  icon: ReactElement;
}

export function TituloComIcone({ icon, titulo }: TituloComIconeProps) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" mb={1.2}>
          <Box
            display="flex"
            alignItems="center"
            color="primary.main"
            sx={{
              marginRight: 2,
              "& svg": {
                fontSize: "2rem",
              },
            }}
          >
            {icon}
          </Box>
          <Typography variant="h5" fontWeight={700}>{titulo}</Typography>
        </Box>
        <Divider />
      </Grid>
    </Grid>
  );
}
