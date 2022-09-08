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
import { Carousel, ResponsiveType, CardInformativo } from "../";
import { findGroup, IFindGroupResponse } from "../../../services/bff/findGroup";
import { stringAvatar } from "../../utils/utils";
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
                <CardActionArea
                  key={grupo.id}
                  sx={{
                    width: "200px",
                    marginLeft: 4,
                    border: "#fff solid 1px",
                    borderRadius: "4px",
                    padding: 2,
                    "&:hover": {
                      cursor: "pointer",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Avatar
                      {...stringAvatar(grupo.title)}
                      sx={{
                        width: 100,
                        height: 100,
                        fontSize: "2.25rem",
                        marginBottom: 2,
                      }}
                    />
                  </Box>

                  <Box width="100%">
                    <Typography variant="body1" fontWeight="bold">
                      {grupo.title}
                    </Typography>
                    <Typography variant="body1">Participantes:</Typography>
                    <AvatarGroup
                      total={grupo.users.length}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                    >
                      {grupo.users.slice(0, 4).map((user) => (
                        <Avatar
                          key={user.id}
                          {...stringAvatar(user.user_name)}
                        />
                      ))}
                    </AvatarGroup>
                  </Box>
                </CardActionArea>
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
