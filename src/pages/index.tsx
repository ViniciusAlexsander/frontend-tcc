import { GetStaticProps } from "next";
import { Box, useTheme, useMediaQuery, Stack } from "@mui/material";
import { Carousel, CardFilme } from "../shared/components";
import { getUpcomingMovies, movie } from "../services/movies/upcomingMovies";
import { ResponsiveType } from "../shared/components/Carousel";
import {
  getNowPlayingMovies,
  nowPlayingMovie,
} from "../services/movies/nowPlayingMovies";
import {
  getPopularMovies,
  popularMovie,
} from "../services/movies/popularMovies";

interface HomeProps {
  upComingMovies: movie[];
  nowPlayingMovies: nowPlayingMovie[];
  popularMovies: popularMovie[];
}

export default function Home({
  upComingMovies,
  nowPlayingMovies,
  popularMovies,
}: HomeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const responsive: ResponsiveType = {
    xl: {
      breakpoint: { max: 3000, min: 1536 },
      items: 7,
      slidesToSlide: 7,
    },
    lg: {
      breakpoint: { max: 1535, min: 1200 },
      items: 5,
      slidesToSlide: 5,
    },
    md: {
      breakpoint: { max: 1199, min: 900 },
      items: 4,
      slidesToSlide: 4,
    },
    sm: {
      breakpoint: { max: 899, min: 600 },
      items: 4,
      slidesToSlide: 3,
    },
    xs: {
      breakpoint: { max: 599, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <Stack spacing={2} sx={{ margin: 1 }}>
      <Box>
        <Carousel
          responsive={responsive}
          titulo="Filmes populares"
          arrows
          mostrarPontos={!isMobile}
          mostrarProximo
        >
          {popularMovies &&
            popularMovies.map((movie) => (
              <CardFilme
                key={movie.id}
                movie={{
                  ...movie,
                }}
              />
            ))}
        </Carousel>
      </Box>
      <Box>
        <Carousel
          responsive={responsive}
          titulo="Nos cinemas"
          arrows
          mostrarPontos={!isMobile}
          mostrarProximo
        >
          {nowPlayingMovies &&
            nowPlayingMovies.map((movie) => (
              <CardFilme
                key={movie.id}
                movie={{
                  ...movie,
                }}
              />
            ))}
        </Carousel>
      </Box>
      <Box>
        <Carousel
          responsive={responsive}
          titulo="Próximos Lançamentos"
          arrows
          mostrarPontos={!isMobile}
          mostrarProximo
        >
          {upComingMovies &&
            upComingMovies.map((movie) => (
              <CardFilme
                key={movie.id}
                movie={{
                  ...movie,
                }}
              />
            ))}
        </Carousel>
      </Box>
    </Stack>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { upComingMovies } = await getUpcomingMovies(1);
  const { nowPlayingMovies } = await getNowPlayingMovies(1);
  const { popularMovies } = await getPopularMovies(1);

  return {
    props: {
      upComingMovies: JSON.parse(JSON.stringify(upComingMovies)),
      nowPlayingMovies: JSON.parse(JSON.stringify(nowPlayingMovies)),
      popularMovies: JSON.parse(JSON.stringify(popularMovies)),
    },
    revalidate: 60 * 60 * 24, // 24hours
  };
};
