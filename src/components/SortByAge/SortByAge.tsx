// import { Swiper, SwiperSlide } from "swiper/react";

// import CommonSwiper from "../Common/CommonSwiper";
import type { AgeSort } from "../../interface";
// import { Age } from "../data/ShopByAge";
import "../../style/global.css";
import "swiper/css";
import { Box, Grid, Typography } from "@mui/material";
import CommonSwiper from "../Common/CommonSwiper";
import { SwiperSlide } from "swiper/react";

import useFetch from "../../Hooks/useFetch";

function SortByAge() {
  const { data: AgeSort } = useFetch<AgeSort>("...");

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 9 }}>
          <CommonSwiper heading={"Shop By Age"}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              {AgeSort.map((item) => (
                <SwiperSlide
                  key={item.age}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="category-card"
                    key={item.age}
                    sx={{
                      height: 180,
                      width: 180,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",

                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    >
                      {item.age}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: "1.4rem",
                      }}
                    >
                      Years
                    </Typography>
                  </Box>
                </SwiperSlide>
              ))}
            </Box>
          </CommonSwiper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SortByAge;
