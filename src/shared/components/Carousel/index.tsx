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
} from "@mui/material";
import MultiCarousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface CarouselProps {
  responsive: ResponsiveType;
  children: React.ReactElement[];
  titulo: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  responsive,
  children,
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
        <MultiCarousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          autoPlay={false}
          autoPlaySpeed={1000}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          deviceType={isMobile ? "mobile" : "desktop"}
        >
          {children}
        </MultiCarousel>
      </Grid>
    </Grid>
  );
};
