import { Box, Typography } from "@mui/material";
import { Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CommonSwiperProps {
  heading: string;
  children: React.ReactNode;
}

function CommonSwiper({ heading, children }: CommonSwiperProps) {
  return (
    <Box
      sx={{
        "& .MuiTypography-root": {
          fontFamily: '"Baloo 2", sans-serif',
        },
        py: 5,
        pt: 5,
      }}
      className="category-section"
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 5,
        }}
      >
        {heading}
      </Typography>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={0}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {children}
      </Swiper>
    </Box>
  );
}

export default CommonSwiper;
