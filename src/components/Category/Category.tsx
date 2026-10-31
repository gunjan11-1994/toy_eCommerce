import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box, Typography } from "@mui/material";
import CommonSwiper from "../Common/CommonSwiper";
import type { Category as CategoryData } from "../../interface";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

function CategorySection() {
  const { data: categories, loading } = useFetch<CategoryData>(
    "http://localhost:3000/categories",
  );

  const navigate = useNavigate();

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="col-lg-10 mx-auto mt-5">
          <CommonSwiper heading="Shop by Category">
            {categories.map((item) => (
              <SwiperSlide key={item.id}>
                <Box
                  className="category-card"
                  sx={{
                    pt: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Category clicked:", item.category);
                    navigate(`/category/${item.category}`);
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    className="category-image"
                    sx={{
                      borderColor: item.color,
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      mt: 2,
                      fontSize: "1.7rem",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </CommonSwiper>
        </div>
      )}
    </div>
  );
}

export default CategorySection;
