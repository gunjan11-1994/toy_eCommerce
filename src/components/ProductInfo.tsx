import { Box, Button, IconButton, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

import type { CartItem, Toy } from "../interface";
import { formatCurrency, formatDate } from "../utils/formatters";

interface ProductInfoProps {
  product: Toy;
  cartItem?: CartItem;
  onFavorite: (toy: Toy) => void;
  onAddToCart: () => void;
}

function ProductInfo({
  product,
  cartItem,
  onFavorite,
  onAddToCart,
}: ProductInfoProps) {
  const stock = product.stock;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 6,
        padding: "60px 6%",
      }}
    >
      {/* LEFT SIDE - IMAGE */}

      <Box
        sx={{
          width: "48%",
          height: 550,
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* RIGHT SIDE */}

      <Box
        sx={{
          flex: 1,
          paddingTop: 1,
        }}
      >
        {/* NAME */}

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 600,
            color: "#222",
            mb: 1.5,
          }}
        >
          {product.name}
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          sx={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#454141",
            mb: 1.5,
          }}
        >
          {product.description}
        </Typography>

        {/* RATING */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "#f5b400",
              letterSpacing: 2,
              fontSize: 17,
            }}
          >
            {"★".repeat(product.rating)}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#999",
            }}
          >
            ({product.rating}/5)
          </Typography>
        </Box>

        {/* PRICE */}

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            color: "#333",
            mb: 3,
          }}
        >
          {formatCurrency(product.price)}
        </Typography>

        {/* STOCK */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              border: "1px dashed #333",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.stock > 0 ? (
              <CheckIcon sx={{ fontSize: 18, color: "green" }} />
            ) : (
              <CloseIcon sx={{ fontSize: 18, color: "red" }} />
            )}
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: product.stock > 0 ? "green" : "red",
            }}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </Typography>
        </Box>

        {/* ADDED ON */}

        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            Added On:{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 400,
                color: "#555",
              }}
            >
              {formatDate(product.addedOn)}
            </Box>
          </Typography>
        </Box>

        {/* MATERIAL */}

        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            Material:{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 400,
                color: "#555",
              }}
            >
              {product.material}
            </Box>
          </Typography>
        </Box>

        {/* QUANTITY */}

        <Typography sx={{ mb: 1 }}>
          Quantity: {cartItem?.quantity || 1}
        </Typography>

        {/* ADD TO CART + WISHLIST */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Button
            fullWidth
            disabled={
              product.stock === 0 ||
              (cartItem ? cartItem.quantity >= stock : false)
            }
            sx={{
              height: 45,
              backgroundColor: "#ff8585",
              color: "#fff",
              textTransform: "none",
              borderRadius: 1,

              "&:hover": {
                backgroundColor: "#ff7070",
              },
            }}
            onClick={onAddToCart}
          >
            Add to cart
          </Button>

          <IconButton
            sx={{
              width: 48,
              height: 48,
              border: "1px dashed #333",
              borderRadius: "50%",
            }}
            onClick={() => onFavorite(product)}
          >
            {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>

        {/* BUY NOW */}

        <Button
          fullWidth
          disabled={product.stock === 0}
          sx={{
            height: 45,
            backgroundColor: "#000",
            color: "#fff",
            textTransform: "none",
            borderRadius: 1,
            mb: 2,

            "&:hover": {
              backgroundColor: "#222",
            },
          }}
        >
          Buy it now
        </Button>

        {/* SHARE */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 4,
          }}
        >
          <ShareIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 13 }}>Share</Typography>
        </Box>

        {/* DELIVERY */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
          <LocalShippingOutlinedIcon />

          <Typography
            sx={{
              fontSize: 13,
              color: "#999",
            }}
          >
            Estimated delivery:{" "}
            <Box
              component="span"
              sx={{
                color: "#222",
                fontWeight: 600,
              }}
            >
              3-6 days
            </Box>
          </Typography>
        </Box>

        {/* RETURN */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <CreditCardOutlinedIcon />

          <Typography
            sx={{
              fontSize: 13,
              color: "#999",
            }}
          >
            Return within{" "}
            <Box
              component="span"
              sx={{
                color: "#222",
                fontWeight: 600,
              }}
            >
              30 days
            </Box>{" "}
            of purchase. Duties & taxes are non-refundable.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo;
