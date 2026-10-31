import { Box, IconButton, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import type { Toy } from "../interface";

type ProductCardProps = {
  toy: Toy;
  onFavorite: (toy: Toy) => void;
  onAddToCart: (toy: Toy) => void;
  onClick: () => void;
  isFavorite: boolean;
};

function ProductCard({
  toy,
  isFavorite,
  onFavorite,
  onAddToCart,
  onClick,
}: ProductCardProps) {
  return (
    <Box onClick={onClick}>
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
            onClick={(event) => {
              event.stopPropagation();
              onFavorite(toy);
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton
            disabled={toy.stock === 0}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "#f37e7e",
              color: "white",

              "&:hover": {
                backgroundColor: "#ee6868",
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart(toy);
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

      <Typography
        sx={{
          mt: 0.5,
          fontSize: "1rem",
          textAlign: "center",
          fontFamily: '"Baloo 2", sans-serif',
          fontWeight: 500,
        }}
      >
        {toy.stock > 0 ? `In Stock - ${toy.stock} items` : "Out of Stock"}
      </Typography>
    </Box>
  );
}

export default ProductCard;
