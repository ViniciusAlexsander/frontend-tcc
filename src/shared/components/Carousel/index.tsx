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
  titulo: string;
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
    marginLeft: "0px 16px",
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
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Grid container xs={12}>
      <Grid item xs={12} mb={4}>
        <Typography variant="h5">{titulo}</Typography>
      </Grid>
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
          deviceType={isMobile ? "mobile" : "desktop"}
        >
          {children}
        </StyledMultiCarousel>
      </Grid>
    </Grid>
  );
};
