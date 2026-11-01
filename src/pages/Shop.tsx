import { Alert, Box, Snackbar, Typography } from "@mui/material";

import type { Toy, FilterState, CartItem, WishlistItem } from "../interface";
import ErrorMessage from "../components/ErroeMessage/ErrorMessage";
import ToyFilter from "../components/ToyFilter";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { setToys } from "../Redux/ToySlice";
import Container from "../di/Container";
import ProductCard from "../components/ProductCard";
import cartService from "../services/cartService";
import { addToCart } from "../Redux/cartSlice";
import type { RootState } from "../Redux/store";
import Pagination from "../components/Pagination";

function Shop() {
  const toyService = Container.toyService;
  const cartItems = useSelector((state: RootState) => state.cart);
  const toys = useSelector((state: RootState) => state.toy);
  const userId = useSelector((state: RootState) => state.authentication.userId);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const toysPerPage = 4;
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [previousSearchText, setPreviousSearchText] = useState(searchText);

  if (previousSearchText !== searchText) {
    setPreviousSearchText(searchText);
    setCurrentPage(1);
  }

  // Get toys from API
  useEffect(() => {
    const loadToys = async () => {
      try {
        setLoading(true);
        const toys = await toyService.getToys();
        dispatch(setToys(toys));
      } catch {
        setError("failed to fetched toys");
      } finally {
        setLoading(false);
      }
    };

    loadToys();
  }, [dispatch, toyService]);

  // Load this user's wishlist
  useEffect(() => {
    const loadWishlist = async () => {
      if (!userId) {
        setWishlistItems([]);
        return;
      }

      try {
        const items = await toyService.getWishlist(userId);
        setWishlistItems(items);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    };

    loadWishlist();
  }, [userId, toyService]);

  const [filters, setFilters] = useState<FilterState>({
    inStock: false,
    outOfStock: false,
    materials: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const handleFavorite = async (toy: Toy) => {
    if (!userId) {
      return;
    }

    const isFavorite = wishlistItems.some((item) => item.toyId === toy.id);

    try {
      await toyService.updateFavorite(toy.id, !isFavorite, userId);

      const updatedItems = await toyService.getWishlist(userId);
      setWishlistItems(updatedItems);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleAddToCart = async (product: Toy) => {
    try {
      if (!userId) {
        console.error("User is not logged in");
        return;
      }

      // Check whether this user already has this toy
      const cartItem = cartItems.find(
        (item: CartItem) => item.toyId === product.id && item.userId === userId,
      );

      if (cartItem) {
        // Toy already exists: increase quantity
        if (cartItem.quantity >= product.stock) {
          return;
        }

        const newQuantity = cartItem.quantity + 1;

        await cartService.updateQuantity(cartItem.id, newQuantity);

        dispatch(
          addToCart({
            ...cartItem,
            quantity: newQuantity,
          }),
        );
      } else {
        // Toy is new for this user
        const { id: toyId, ...productDetails } = product;

        const newCartItem = {
          ...productDetails,
          toyId,
          userId,
          quantity: 1,
        };

        const savedItem = await cartService.addToCart(newCartItem);

        dispatch(addToCart(savedItem));
      }

      setMessage(`${product.name} added to cart!`);
      setOpenMessage(true);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  // Filter toys
  const filterToy = toys.filter((toy: Toy) => {
    const matchSearch = toy.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchAvailability =
      (!filters.inStock && !filters.outOfStock) ||
      (filters.inStock && toy.stock > 0) ||
      (filters.outOfStock && toy.stock === 0);

    const matchMaterial =
      filters.materials.length === 0 ||
      filters.materials.includes(toy.material);

    const matchMinPrice =
      filters.minPrice === 0 || toy.price >= filters.minPrice;

    const matchMaxPrice =
      filters.maxPrice === 0 || toy.price <= filters.maxPrice;

    return (
      matchSearch &&
      matchAvailability &&
      matchMaterial &&
      matchMinPrice &&
      matchMaxPrice
    );
  });

  // Calculate total pages AFTER filtering
  const totalPages = Math.ceil(filterToy.length / toysPerPage);

  // Keep the current page within the available page range
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  // Get toys for the current page
  const paginatedToys = filterToy.slice(
    (safeCurrentPage - 1) * toysPerPage,
    safeCurrentPage * toysPerPage,
  );

  // Loading
  if (loading) {
    return <Loader />;
  }

  // Error
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Success
  return (
    <>
      <Box
        sx={{
          width: "92%",
          margin: "40px auto",
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* Left sidebar */}
        <ToyFilter
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
        />

        {/* Toys */}
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
            {paginatedToys.map((toy: Toy) => {
              const isFavorite = wishlistItems.some(
                (item) => item.toyId === toy.id,
              );

              return (
                <ProductCard
                  key={toy.id}
                  toy={toy}
                  isFavorite={isFavorite}
                  onFavorite={handleFavorite}
                  onAddToCart={() => handleAddToCart(toy)}
                  onClick={() => navigate(`/product/${toy.id}`)}
                />
              );
            })}
          </Box>

          {/* No toys found */}
          {filterToy.length === 0 && (
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

        {/* Snackbar */}
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
            {message}
          </Alert>
        </Snackbar>
      </Box>

      {/* Pagination */}
      {filterToy.length > 0 && (
        <Pagination
          count={totalPages}
          page={safeCurrentPage}
          onChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default Shop;
