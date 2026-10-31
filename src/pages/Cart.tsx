import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddressDrawer from "../pages/AddressDrawer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import cartBanner from "../../public/banner2.jpg";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
  clearCart,
} from "../Redux/cartSlice";

import type { BillingAddress, CartItem } from "../interface";
import type { RootState } from "../Redux/store";
import billingAddressService from "../services/billingAddressService";
import { formatCurrency } from "../utils/formatters";
import Container from "../di/Container";
import Loader from "../components/Loader/Loader";
import CommonButton from "../components/Common/CommonButton";
import OrderSummary from "./OrderSummary";
const cartService = Container.cartService;
const orderService = Container.orderService;
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart);
  console.log("Redux cart items:", items);

  const userId = useSelector((state: RootState) => state.authentication.userId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false);
  const [address, setAddress] = useState<BillingAddress | null>(null);

  // ================= LOAD CART =================

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        dispatch(setCart([]));
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await cartService.getCartItems(userId);

        console.log("API cart data:", data);

        dispatch(setCart(data));
      } catch {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [dispatch, userId]);

  useEffect(() => {
    const loadAddress = async () => {
      if (!userId) {
        setAddress(null);
        return;
      }

      try {
        const addresses = await billingAddressService.getAddress(userId);

        setAddress(addresses[0] ?? null);
      } catch (error) {
        console.error("Failed to load delivery address:", error);
      }
    };

    loadAddress();
  }, [userId]);

  // ================= INCREASE QUANTITY =================

  const handleIncrease = async (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
      return;
    }

    try {
      setUpdatingItemId(cartItem.id);
      setError("");

      await cartService.updateQuantity(cartItem.id, cartItem.quantity + 1);

      dispatch(increaseQuantity(cartItem.id));
    } catch {
      setError("Failed to increase cart item");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // ================= DECREASE QUANTITY =================

  const handleDecrease = async (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      return;
    }

    try {
      setUpdatingItemId(cartItem.id);
      setError("");

      await cartService.updateQuantity(cartItem.id, cartItem.quantity - 1);

      dispatch(decreaseQuantity(cartItem.id));
    } catch {
      setError("Failed to decrease cart item");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // ================= DELETE ITEM =================

  const handleDelete = async (cartItem: CartItem) => {
    try {
      setUpdatingItemId(cartItem.id);
      setError("");

      await cartService.deleteItem(cartItem.id);

      dispatch(removeFromCart(cartItem.id));
    } catch {
      setError("Failed to delete cart item");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // ================= CLEAR CART =================

  const handleClearCart = async () => {
    try {
      setError("");

      await cartService.clearCart(String(userId));

      dispatch(clearCart());
    } catch {
      setError("Failed to clear cart");
    }
  };

  const handlePlaceOrder = async () => {
    // 1. Check whether the cart has items
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // 2. Check whether the user is logged in
    if (!userId) {
      setError("Please log in before placing your order.");
      return;
    }

    // 3. Check whether a delivery address is selected
    if (!address) {
      setError("Please add a delivery address before placing your order.");
      setAddressDrawerOpen(true);
      return;
    }

    // 4. Calculate the total
    const orderTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // 5. Prepare the order data
    const order = {
      userId: address.userId,
      billingAddressId: address.id ?? null,
      billingAddress: address,
      items: items,
      total: orderTotal,
      status: "Placed",
      orderDate: new Date().toISOString(),
    };

    try {
      setError("");

      // 6. Save the order to the database
      const savedOrder = await orderService.createOrder(order);

      console.log("Order created:", savedOrder);

      // 7. Clear the cart only after the order is saved
      await cartService.clearCart(String(userId));

      dispatch(clearCart());

      // 8. Navigate to the confirmation page
      navigate("/orderPlaced");
    } catch (error) {
      console.error("Failed to place order:", error);
      setError("Failed to place your order. Please try again.");
    }
  };
  // ================= LOADING =================

  if (loading) {
    return <Loader />;
  }

  // ================= EMPTY CART =================

  if (items.length === 0) {
    return (
      <Box
        sx={{
          px: 6,
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Your Cart is Empty
        </Typography>

        <Typography
          sx={{
            mb: 3,
            color: "text.secondary",
          }}
        >
          Add some toys to your cart and they will appear here.
        </Typography>

        <CommonButton
          text={"Continue Shopping"}
          backColor={"#ff7d80"}
          color={"white"}
          onClick={() => navigate("/shop")}
        />
      </Box>
    );
  }

  // ================= CART UI =================

  return (
    <>
      <Box
        sx={{
          px: 6,
          pt: 2,
        }}
      >
        <Box
          sx={{
            height: 300,
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={cartBanner}
            alt="Shopping Cart"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Your Shopping Cart
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* =====================================================
          FREE SHIPPING
          FULL WIDTH - BEFORE TWO COLUMNS
      ====================================================== */}

      <Box
        sx={{
          px: 6,
          mt: 8,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          Congratulations! You've got{" "}
          <Box
            component="span"
            sx={{
              color: "#ff6f70",
              fontWeight: 500,
            }}
          >
            Free Shipping!
          </Box>
        </Typography>
      </Box>

      {/* =====================================================
          SHIPPING LINE + TRUCK
          FULL WIDTH - BEFORE TWO COLUMNS
      ====================================================== */}

      <Box
        sx={{
          px: 6,
          mb: 6,
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          {/* SHIPPING LINE */}

          <Box
            sx={{
              height: 6,
              borderRadius: 5,
              background:
                "repeating-linear-gradient(135deg, #ff8a8d 0px, #ff8a8d 10px, #ffc0c0 10px, #ffc0c0 18px)",
            }}
          />

          {/* TRUCK */}

          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: -18,
              backgroundColor: "white",
              px: 1,
            }}
          >
            <LocalShippingIcon
              sx={{
                fontSize: 38,
                color: "#f5a6a6",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* =====================================================
          TWO COLUMNS START HERE
      ====================================================== */}

      <Box
        sx={{
          px: 6,
          pb: 6,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1fr) 450px",
          },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* ===================================================
            LEFT COLUMN - CART
        ==================================================== */}

        <Box>
          {/* CART TITLE */}
          {/* DELIVERY ADDRESS */}

          <Box
            sx={{
              mb: 4,
              p: 3,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* DELIVERY ADDRESS */}
              <Box
                sx={{
                  mb: 3,
                  px: 2.5,
                  py: 2,
                  borderBottom: "1px solid #e5e5e5",
                  backgroundColor: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {/* LOCATION ICON */}
                    <Box
                      sx={{
                        color: "#b45b35",
                        mt: 0.3,
                        display: "flex",
                      }}
                    >
                      <LocationOnIcon />
                    </Box>

                    {/* ADDRESS DETAILS */}
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      {address ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: 16,
                              color: "#444",
                              mb: 0.5,
                            }}
                          >
                            Deliver to{" "}
                            <Box
                              component="span"
                              sx={{ fontWeight: 700, color: "#333" }}
                            >
                              {address.firstName} {address.lastName}
                            </Box>
                            {", "}
                            <Box
                              component="span"
                              sx={{ fontWeight: 700, color: "#333" }}
                            >
                              {address.postcode}
                            </Box>
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 14,
                              color: "#666",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {address.streetAddress}, {address.city},{" "}
                            {address.state}
                          </Typography>
                        </>
                      ) : (
                        <Typography sx={{ fontSize: 15, color: "#666" }}>
                          No saved address. Please add a delivery address.
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* CHANGE BUTTON */}
                  <Button
                    variant="outlined"
                    onClick={() => setAddressDrawerOpen(true)}
                    sx={{
                      color: "#b45b35",
                      borderColor: "#b45b35",
                      borderRadius: 1.5,
                      px: 1.5,
                      py: 0.5,
                      minWidth: "auto",
                      flexShrink: 0,
                      textTransform: "uppercase",
                      "&:hover": {
                        borderColor: "#964323",
                        backgroundColor: "#fff7f2",
                      },
                    }}
                  >
                    {address ? "Change" : "Add"} Address
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              Your Cart
            </Typography>

            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              disabled={items.length === 0}
              sx={{
                textTransform: "none",
                px: 3,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Clear Cart
            </Button>
          </Box>

          {/* TABLE HEADER */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 50px",
              alignItems: "center",
              pb: 1.5,
            }}
          >
            <Typography variant="body2">Product</Typography>

            <Typography variant="body2">Quantity</Typography>

            <Typography variant="body2">Price</Typography>

            <Typography variant="body2">Total</Typography>

            <Box />
          </Box>

          <Divider />

          {/* CART ITEMS */}

          {items.map((cartItem) => {
            const isUpdating = updatingItemId === cartItem.id;

            return (
              <Box key={cartItem.id}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 50px",
                    alignItems: "center",
                    py: 4,
                  }}
                >
                  {/* PRODUCT */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={cartItem.image}
                      alt={cartItem.name}
                      sx={{
                        width: 95,
                        height: 95,
                        objectFit: "contain",
                        borderRadius: 2,
                      }}
                    />

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "gray",
                        }}
                      >
                        TOY WORLD
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {cartItem.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        {cartItem.material} / {cartItem.stock} /{" "}
                        {cartItem.category}
                      </Typography>
                    </Box>
                  </Box>

                  {/* QUANTITY */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px dashed black",
                      borderRadius: 2,
                      width: 145,
                      height: 45,
                      justifyContent: "space-around",
                      opacity: isUpdating ? 0.6 : 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      disabled={isUpdating || cartItem.quantity <= 1}
                      onClick={() => handleDecrease(cartItem)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography>{cartItem.quantity}</Typography>

                    <IconButton
                      size="small"
                      disabled={
                        isUpdating || cartItem.quantity >= cartItem.stock
                      }
                      onClick={() => handleIncrease(cartItem)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* PRICE */}

                  <Typography>{formatCurrency(cartItem.price)}</Typography>

                  {/* TOTAL */}

                  <Typography>
                    {formatCurrency(cartItem.price * cartItem.quantity)}
                  </Typography>

                  {/* DELETE */}

                  <IconButton
                    disabled={isUpdating}
                    onClick={() => handleDelete(cartItem)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>

                <Divider />
              </Box>
            );
          })}

          {/* CONTINUE SHOPPING */}

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff7d80",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#ff6f72",
                },
              }}
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>

        {/* ===================================================
            RIGHT COLUMN
        ==================================================== */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* APPLY COUPON */}

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#071d3b",
                mb: 3,
              }}
            >
              Apply Coupon
            </Typography>

            <TextField
              fullWidth
              placeholder="Coupon Code"
              variant="outlined"
              sx={{
                mb: 1.5,

                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d9d9d9",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                height: 55,
                borderRadius: 2,
                backgroundColor: "#ff9412",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#f28708",
                  boxShadow: "none",
                },
              }}
            >
              Apply Coupon
            </Button>
          </Paper>

          {/* CART TOTALS */}

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            <OrderSummary />
            {/* CHECKOUT BUTTON */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CommonButton
                text={"Place Order"}
                backColor={"#ff7d80"}
                color={"white"}
                onClick={handlePlaceOrder}
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      <AddressDrawer
        open={addressDrawerOpen}
        onClose={() => setAddressDrawerOpen(false)}
        onAddressSelect={(selectedAddress) => {
          setAddress(selectedAddress);
        }}
      />

      {/* =====================================================
          ERROR SNACKBAR
      ====================================================== */}

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Cart;
