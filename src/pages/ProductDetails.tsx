import { Box, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import type { CartItem, Toy } from "../interface";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErroeMessage/ErrorMessage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart } from "../Redux/cartSlice";
import { setToys, wishList } from "../Redux/ToySlice";
import Container from "../di/Container";
import cartService from "../services/cartService";
import ProductInfo from "../components/ProductInfo";
import type { RootState } from "../Redux/store";

function ProductDetails() {
  const [openMessage, setOpenMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();
  const toyService = Container.toyService;
  const cartItems = useSelector((state: RootState) => state.cart);
  const toys = useSelector((state: RootState) => state.toy);
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const cartItem = cartItems.find(
    (item: CartItem) => item.toyId === Number(id) && item.userId === userId,
  );

  useEffect(() => {
    const loadToys = async () => {
      try {
        setLoading(true);

        const toys = await toyService.getToys();

        dispatch(setToys(toys));
      } catch {
        setError("Failed to fetch toys");
      } finally {
        setLoading(false);
      }
    };

    loadToys();
  }, [dispatch, toyService]);

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        dispatch(setCart([]));
        return;
      }

      try {
        const cart = await cartService.getCartItems(userId);
        dispatch(setCart(cart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, [dispatch, userId]);

  const product = toys.find((toy: Toy) => toy.id === Number(id));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        // onRetry={refetch}
      />
    );
  }

  if (!product) {
    return <ErrorMessage message="Product not found." />;
  }

  const stock = product.stock;

  const handleFavorite = async (toy: Toy) => {
    if (!userId) {
      return;
    }

    await toyService.updateFavorite(toy.id, !toy.favorite, userId);
    dispatch(wishList(toy.id));
    // refetch();
  };

  const handleAddToCart = async () => {
    if (cartItem) {
      if (cartItem.quantity >= stock) {
        return;
      }

      await cartService.updateQuantity(cartItem.id, cartItem.quantity + 1);
      dispatch(
        addToCart({
          ...cartItem,
          quantity: cartItem.quantity + 1,
        }),
      );
    } else {
      if (!userId) {
        return;
      }

      const { id: toyId, ...toyDetails } = product;
      const savedItem = await cartService.addToCart({
        ...toyDetails,
        toyId,
        userId,
        quantity: 1,
      });
      dispatch(addToCart(savedItem));
    }

    setOpenMessage(true);
  };

  return (
    <Box>
      <ProductInfo
        product={product}
        cartItem={cartItem}
        onFavorite={handleFavorite}
        onAddToCart={handleAddToCart}
      />

      {/* SNACKBAR */}

      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={() => setOpenMessage(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setOpenMessage(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductDetails;
