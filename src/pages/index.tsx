import { GetStaticProps } from "next";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Carousel, CardFilme } from "../shared/components";
import { getUpcomingMovies, movie } from "../services/movies/upcomingMovies";
import { ResponsiveType } from "../shared/components/Carousel";

interface HomeProps {
  upComingMovies: movie[];
}

export default function Home({ upComingMovies }: HomeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 1199, min: 900 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 899, min: 600 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
  };
  return (
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
            <CardFilme key={movie.id} movie={movie} />
          ))}
      </Carousel>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { upComingMovies } = await getUpcomingMovies(1);

  return {
    props: {
      upComingMovies: JSON.parse(JSON.stringify(upComingMovies)),
    },
    revalidate: 60 * 60 * 24, // 24hours
  };
};
