import { Box, IconButton, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useParams } from "react-router-dom";
import { useState } from "react";

import type { Toy, FilterState } from "../interface";
import useFetch from "../Hooks/useFetch";
import ToyFilter from "../components/ToyFilter";
import Loader from "../components/Loader/Loader";

function CategoryProduct() {
  const { category } = useParams<{ category: string }>();

  const { data: toys, loading } = useFetch<Toy>("http://localhost:3000/toys");

  const [filters, setFilters] = useState<FilterState>({
    inStock: false,
    outOfStock: false,
    materials: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const categoryToys = toys.filter((toy) => toy.category === category);

  return loading ? (
    <Loader />
  ) : (
    <Box
      sx={{
        width: "92%",
        margin: "40px auto",
        display: "flex",
        gap: 4,
        alignItems: "flex-start",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Box
        sx={{
          width: "230px",
          minWidth: "230px",
        }}
      >
        <ToyFilter filters={filters} onFilterChange={setFilters} />
      </Box>

      {/* RIGHT SIDE - PRODUCTS */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {categoryToys.map((toy) => (
          <Box key={toy.id}>
            <Box
              sx={{
                position: "relative",
                border: "1px dashed #aaa",
                borderRadius: "20px",
                height: "390px",
                overflow: "hidden",

                "&:hover .toy-actions": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              }}
            >
              <Box
                component="img"
                src={toy.image}
                alt={toy.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <Box
                className="toy-actions"
                sx={{
                  position: "absolute",
                  top: "25px",
                  right: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  opacity: 0,
                  transform: "translateX(20px)",
                  transition: "all 0.3s ease",
                }}
              >
                <IconButton
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#f37e7e",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ee6868",
                    },
                  }}
                  onClick={() => {
                    console.log("Wishlist:", toy.name);
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                <IconButton
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#f37e7e",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ee6868",
                    },
                  }}
                  onClick={() => {
                    console.log("Add to cart:", toy.name);
                  }}
                >
                  <ShoppingBagOutlinedIcon />
                </IconButton>
              </Box>
            </Box>

            <Typography
              sx={{
                mt: 2,
                fontSize: "1.25rem",
                fontFamily: '"Baloo 2", sans-serif',
                textAlign: "center",
              }}
            >
              {toy.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: "1.1rem",
                color: "#777",
                fontFamily: '"Baloo 2", sans-serif',
                textAlign: "center",
              }}
            >
              Rs. {toy.price.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CategoryProduct;
