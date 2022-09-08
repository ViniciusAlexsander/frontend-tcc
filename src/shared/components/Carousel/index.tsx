import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import MultiCarousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface ICarouselProps {
  titulo?: string;
  velocidadeAutoPlay?: number;
  slidesToSlide?: number;
  arrows?: boolean;
  infinite?: boolean;
  children: React.ReactNode;
  responsive: ResponsiveType;
  mostrarProximo?: boolean;
  mostrarPontos?: boolean;
}

export type { ResponsiveType };

const StyledMultiCarousel = styled(MultiCarousel)(({ theme }) => ({
  ".itemClass": {
    // marginLeft: "20px", // margem entre os itens
    marginBottom: "32px",
  },
  ".dotClass": {
    "& button": {
      borderColor: theme.palette.primary.light,
      borderWidth: "1px",
    },
    "& .react-multi-carousel-dot--active button": {
      background: theme.palette.primary.light,
      borderColor: theme.palette.primary.light,
    },
  },
}));

export const Carousel: React.FC<ICarouselProps> = ({
  velocidadeAutoPlay,
  responsive,
  slidesToSlide,
  children,
  arrows,
  infinite,
  mostrarProximo,
  mostrarPontos,
  titulo,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  let deviceType;
  if (isXs) deviceType = "xs";
  if (isSm) deviceType = "sm";
  if (isMd) deviceType = "md";
  if (isLg) deviceType = "lg";
  if (isXl) deviceType = "xl";

  return (
    <Grid container padding={2}>
      {titulo && (
        <Grid item xs={12} mb={4}>
          <Typography variant="h5" fontWeight={700}>
            {titulo}
          </Typography>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sx={{
          "& .react-multi-carousel-dot-list": {
            marginTop: 2,
          },
        }}
      >
        <StyledMultiCarousel
          additionalTransfrom={0}
          arrows={!!arrows}
          autoPlaySpeed={velocidadeAutoPlay}
          autoPlay={!!velocidadeAutoPlay}
          infinite={!!infinite}
          showDots={!!mostrarPontos}
          centerMode={false}
          containerClass=""
          dotListClass="dotClass"
          draggable
          focusOnSelect={false}
          itemClass="itemClass"
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible={!!mostrarProximo}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          sliderClass=""
          slidesToSlide={slidesToSlide}
          swipeable
          ssr={true} // means to render carousel on server-side.
          deviceType={deviceType}
        >
          {children}
        </StyledMultiCarousel>
      </Grid>
    </Grid>
  );
};
