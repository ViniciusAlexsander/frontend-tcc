import { Box, Grid, Icon, Typography, useTheme } from "@mui/material";
import React, { ReactElement, useMemo } from "react";

interface CardInformativoProps {
  mensagem: string | ReactElement;
  icon?: ReactElement;
  fullWidth?: boolean;
  tipo: "success" | "info" | "error" | "warning";
}

const CardInformativo = ({
  mensagem,
  icon,
  fullWidth = false,
  tipo,
}: CardInformativoProps) => {
  const theme = useTheme();

  const corPorTipo: {
    [tipo: string]: { corTexto: string; corBackground: string };
  } = useMemo(() => {
    return {
      success: {
        corTexto: "success.main",
        corBackground: "rgba(2, 196, 211, 0.1)",
      },
      info: {
        corTexto: "primary.light",
        corBackground: "rgba(113, 121, 201, 0.2)",
      },
      error: {
        corTexto: "error.main",
        corBackground: "rgba(232, 72, 85, 0.1)",
      },
      warning: {
        corTexto: "warning.main",
        corBackground: "rgba(250, 128, 34, 0.1)",
      },
    };
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Box display='flex' justifyContent="center" gap={2}>
        <Box
          bgcolor={corPorTipo[tipo].corBackground}
          display="inline-flex"
          p={2}
          justifyContent="center"
          alignItems="center"
          width="100%"
          borderRadius="4px"
        >
          {icon && (
            <Icon
              sx={{
                color: corPorTipo[tipo].corTexto,
              }}
            >
              {icon}
            </Icon>
          )}
          <Typography
            variant="body2"
            ml={1}
            sx={{ color: tipo ? corPorTipo[tipo].corTexto : "textSecondary" }}
          >
            {mensagem}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export { CardInformativo };
export type { CardInformativoProps };
