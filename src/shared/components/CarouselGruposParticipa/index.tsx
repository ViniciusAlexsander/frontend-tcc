import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Carousel, ResponsiveType, CardInformativo, CardGrupo } from "../";
import {
  findGroups,
  IFindGroupResponse,
} from "../../../services/bff/findGroup";
import { SentimentVeryDissatisfied } from "@mui/icons-material";

interface CarouselGruposParticipaProps {
  atualizarGrupos: boolean;
  setAtualizarGrupos: (atualizarGrupos: boolean) => void;
}

export const CarouselGruposParticipa = ({
  atualizarGrupos,
  setAtualizarGrupos,
}: CarouselGruposParticipaProps) => {
  const [myGroups, setMyGroups] = useState<IFindGroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardInformativoData, setCardInformativoData] = useState<{
    message: string;
    tipo: "success" | "info" | "error" | "warning";
  }>({ message: "", tipo: "info" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const responsive: ResponsiveType = {
    xl: {
      breakpoint: { max: 3000, min: 1536 },
      items: 6,
      slidesToSlide: 7,
    },
    lg: {
      breakpoint: { max: 1535, min: 1200 },
      items: 4,
      slidesToSlide: 5,
    },
    md: {
      breakpoint: { max: 1199, min: 900 },
      items: 3,
      slidesToSlide: 4,
    },
    sm: {
      breakpoint: { max: 899, min: 600 },
      items: 2,
      slidesToSlide: 3,
    },
    xs: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
      slidesToSlide: 2,
    },
  };

  useEffect(() => {
    console.log("carousel-atualizarGrupos", atualizarGrupos);
    const findGroupService = async () => {
      try {
        setLoading(true);
        const groups = await findGroups({ isMember: true });
        setMyGroups(groups);
        setCardInformativoData({
          message: "Você ainda não faz parte de nenhum grupo",
          tipo: "info",
        });
      } catch (error) {
        setCardInformativoData({
          message: "Ocorreu um erro ao buscar os seus grupos",
          tipo: "error",
        });
      } finally {
        setLoading(false);
        setAtualizarGrupos(false);
      }
    };
    findGroupService();
  }, [atualizarGrupos, setAtualizarGrupos]);

  return (
    <Box>
      {loading ? (
        <Grid
          item
          xs={12}
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {myGroups && myGroups.length > 0 ? (
            <Carousel
              responsive={responsive}
              arrows
              mostrarPontos={!isMobile}
              mostrarProximo
            >
              {myGroups.map((grupo) => (
                <CardGrupo grupo={grupo} key={grupo.id} />
              ))}
            </Carousel>
          ) : (
            <Grid item xs={12} mt={2}>
              <CardInformativo
                mensagem={cardInformativoData.message}
                tipo={cardInformativoData.tipo}
                icon={<SentimentVeryDissatisfied />}
              />
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};
