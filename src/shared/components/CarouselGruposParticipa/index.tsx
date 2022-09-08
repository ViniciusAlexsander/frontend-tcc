import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CardActionArea,
  Avatar,
  AvatarGroup,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Carousel, ResponsiveType, CardInformativo, CardGrupo } from "../";
import { findGroup, IFindGroupResponse } from "../../../services/bff/findGroup";
import { SentimentVeryDissatisfied, Search } from "@mui/icons-material";

export const CarouselGruposParticipa = () => {
  const [myGroups, setMyGroups] = useState<IFindGroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
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

  const findGroupService = async () => {
    setLoading(true);
    const groups = await findGroup("", "");
    setMyGroups(groups);
    setLoading(false);
  };

  useEffect(() => {
    findGroupService();
  }, []);

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
          <Grid item xs={12} mb={4}>
            <Typography variant="h5" fontWeight={700}>
              Seus grupos
            </Typography>
          </Grid>
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
                mensagem={"Você ainda não faz parte de nenhum grupo"}
                tipo="info"
                icon={<SentimentVeryDissatisfied />}
              />
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};
