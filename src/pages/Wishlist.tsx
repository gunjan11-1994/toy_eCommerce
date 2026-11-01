import { Box, IconButton, Typography } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { CartItem, Toy } from "../interface";
import { useNavigate } from "react-router-dom";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";\
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";

import { setToys, removeFromWishlitst } from "../Redux/ToySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "../di/Container";
import { addToCart, increaseQuantity } from "../Redux/cartSlice";
import cartService from "../services/cartService";
import type { RootState } from "../Redux/store";

const Wishlist = () => {
  const toyService = Container.toyService;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const toys = useSelector((state: RootState) => state.toy);
  const cartItems = useSelector((state: RootState) => state.cart);

  const userId = useSelector((state: RootState) => state.authentication.userId);

  const handleFavorite = async (toy: Toy) => {
    try {
      if (!userId) {
        setError("Please log in first.");
        return;
      }

      await toyService.updateFavorite(toy.id, false, userId);

      dispatch(removeFromWishlitst(toy.id));
    } catch (error) {
      console.error("Remove wishlist error:", error);
      setError("The toy could not be removed from the wishlist.");
    }
  };

  const handleAddToCart = async (toy: Toy) => {
    try {
      if (!userId) {
        setError("Please log in before adding items to cart.");
        return;
      }

      // Find the toy using its original toy ID
      const existingItem = cartItems.find(
        (cartItem: CartItem) =>
          cartItem.toyId === toy.id && cartItem.userId === userId,
      );

      if (existingItem) {
        if (existingItem.quantity >= toy.stock) {
          setError(`Only ${toy.stock} items available.`);
          return;
        }

        await cartService.updateQuantity(
          existingItem.id,
          existingItem.quantity + 1,
        );

        dispatch(increaseQuantity(existingItem.id));
        setSuccess(`${toy.name} quantity updated!`);
        return;
      }

      // Do not send the toy's ID as the cart record's ID.
      const { id: toyId, ...toyDetails } = toy;

      const newCartItem = {
        ...toyDetails,
        toyId,
        userId,
        quantity: 1,
      };

      const savedItem = await cartService.addToCart(newCartItem);

      dispatch(addToCart(savedItem));
      setSuccess(`${toy.name} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      setError("Failed to add toy. Please try again.");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchedToys = async () => {
      try {
        if (!userId) {
          dispatch(setToys([]));
          return;
        }

        // Get this user's favorite records
        const wishlistItems = await toyService.getWishlist(userId);

        // Get all toy details
        const allToys = await toyService.getToys();

        // Show only toys that this user has favorited
        const favoriteToys = allToys.filter((toy) =>
          wishlistItems.some((item) => item.toyId === toy.id),
        );

        dispatch(
          setToys(
            favoriteToys.map((toy) => ({
              ...toy,
              favorite: true,
            })),
          ),
        );
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        setError("Failed to load wishlist.");
      }
    };

    fetchedToys();
  }, [dispatch, userId, toyService]);

  return (
    <Box>
      {/* error  */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>

      {/* sucsess
       */}
      <Snackbar
        open={Boolean(success)}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      </Snackbar>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {toys.map((toy: Toy) => (
            <Box key={toy.id} onClick={() => navigate(`/product/${toy.id}`)}>
              {/* Image Box */}

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
                {/* Toy Image */}

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

                {/* Right Side Icons */}

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
                  {/* delete */}
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

                      handleFavorite(toy);

                      console.log("delete:", toy.name);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* Add to Cart */}

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
                      handleAddToCart(toy);
                      console.log("Add to cart:", toy.name);
                    }}
                  >
                    <ShoppingBagOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Toy Name */}

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

              {/* Price */}

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

              {/* Stock */}

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "1rem",
                  textAlign: "center",
                  fontFamily: '"Baloo 2", sans-serif',
                  fontWeight: 500,
                }}
              >
                {toy.stock > 0
                  ? `In Stock - ${toy.stock} items`
                  : "Out of Stock"}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* No Toys Found */}

        {toys.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              mt: 5,
              fontSize: "1.3rem",
              fontFamily: '"Baloo 2", sans-serif',
            }}
          >
            No toys found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;
