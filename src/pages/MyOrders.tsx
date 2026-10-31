import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import orderService from "../services/orderService";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { useEffect, useState } from "react";
import type { Order } from "../interface";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../Redux/cartSlice";
import cartService from "../services/cartService";
import type { CartItem } from "../interface";
import { formatDate } from "../utils/formatters";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const steps = ["Order Placed", "Packed", "Shipped", "Delivered"];

// Convert order status into the correct tracking step

const getActiveStep = (orderDate: string) => {
  const orderTime = new Date(orderDate).getTime();
  const currentTime = new Date().getTime();

  const daysPassed = Math.floor(
    (currentTime - orderTime) / (1000 * 60 * 60 * 24),
  );
  console.log("Order date:", orderDate);
  console.log("Days passed:", daysPassed);

  if (daysPassed >= 3) {
    return 3; // Delivered
  }

  if (daysPassed >= 2) {
    return 2; // Shipped
  }

  if (daysPassed >= 1) {
    return 1; // Packed
  }

  return 0; // Placed
};

const getOrderStatus = (orderDate: string) => {
  const activeStep = getActiveStep(orderDate);

  const statuses = ["Placed", "Packed", "Shipped", "Delivered"];

  return statuses[activeStep];
};
const getDeliveryDate = (orderDate: string) => {
  const deliveryDate = new Date(orderDate);

  deliveryDate.setDate(deliveryDate.getDate() + 4);

  return formatDate(deliveryDate.toISOString());
};

export default function MyOrders() {
  const userId = useSelector((state: RootState) => state.authentication.userId);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await orderService.getOrders(userId);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleReorder = async (order: Order) => {
    if (!userId) {
      console.error("Please log in before reordering.");
      return;
    }

    try {
      // 1. Get the current cart items
      const oldCartItems = await cartService.getCartItems(userId);

      // 2. Prepare the items from the selected order
      const reorderedItems = order.items.map((item) => {
        const { id, ...itemDetails } = item;

        return {
          ...itemDetails,
          toyId: item.toyId ?? id,
          userId,
          quantity: item.quantity,
        };
      });

      // 3. Add the reordered items first
      const savedItems: CartItem[] = [];

      for (const item of reorderedItems) {
        const savedItem = await cartService.addToCart(item);
        savedItems.push(savedItem);
      }

      // 4. If all new items were added, remove the old cart items
      await Promise.all(
        oldCartItems.map((item) => cartService.deleteItem(item.id)),
      );

      // 5. Update Redux with the new cart
      dispatch(setCart(savedItems));

      // 6. Open the cart page
      navigate("/cart");
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: 4,
        bgcolor: "#FFFDF9",
        minHeight: "100vh",
      }}
    >
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: "#333333", mb: 1 }}
      >
        My Orders
      </Typography>

      <Typography sx={{ color: "#777", mb: 3 }}>
        Track your little one's happy deliveries!
      </Typography>

      {/* Loading Message */}
      {loading && <Typography sx={{ mb: 2 }}>Loading orders...</Typography>}

      {/* Error Message */}
      {!loading && error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Empty Orders Message */}
      {!loading && !error && orders.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid #F0E7DB",
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={1}>
            No orders found
          </Typography>

          <Typography color="text.secondary">
            Your orders will appear here after you place an order.
          </Typography>
        </Paper>
      )}

      {/* Display Each Order */}
      {!loading &&
        !error &&
        orders.map((order) => (
          <Box key={order.id} sx={{ mb: 4 }}>
            {/* Customer and Order Details */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #F0E7DB",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                {order.billingAddress?.firstName}{" "}
                {order.billingAddress?.lastName}
              </Typography>

              <Box display="flex" gap={1} alignItems="flex-start" mb={2}>
                <LocationOnOutlinedIcon sx={{ color: "#F5A623" }} />

                <Box>
                  <Typography fontWeight={600} fontSize={14}>
                    Delivery Address
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {order.billingAddress?.streetAddress},{" "}
                    {order.billingAddress?.city}, {order.billingAddress?.state}{" "}
                    - {order.billingAddress?.postcode}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ORDER DATE
                  </Typography>

                  <Typography fontWeight={700}>
                    {order.orderDate
                      ? formatDate(order.orderDate)
                      : "Date not available"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ORDER TOTAL
                  </Typography>

                  <Typography fontWeight={800} color="#E98A25">
                    ₹{order.total}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ORDER STATUS
                  </Typography>

                  <Typography fontWeight={700}>
                    {getOrderStatus(order.orderDate)}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Product Details */}
            {order.items.map((item, index) => (
              <Paper
                key={`${item.id}-${index}`}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #F0E7DB",
                  mb: 3,
                }}
              >
                <Box display="flex" alignItems="flex-start" gap={2}>
                  {/* Product Image */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: { xs: 110, sm: 150 },
                      height: { xs: 125, sm: 160 },
                      flexShrink: 0,
                      bgcolor: "#FFF4E5",
                      borderRadius: 2,
                      objectFit: "contain",
                    }}
                  />

                  {/* Product Information */}
                  <Box flex={1} minWidth={0}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ lineHeight: 1.4, mb: 1 }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{ color: "#E98A25", mb: 1 }}
                    >
                      ₹{item.price}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Quantity: {item.quantity}
                    </Typography>

                    <Chip
                      icon={<LocalShippingOutlinedIcon />}
                      label={getOrderStatus(order.orderDate)}
                      size="small"
                      sx={{
                        bgcolor: "#FFF0D2",
                        color: "#A66300",
                        fontWeight: 700,
                        "& .MuiChip-icon": {
                          color: "#A66300",
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <LocalShippingIcon />
                  <Typography>
                    Get it by{" "}
                    <strong>{getDeliveryDate(order.orderDate)}</strong>
                  </Typography>
                </Box>
              </Paper>
            ))}

            {/* Order Tracking */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #F0E7DB",
                mb: 3,
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocalShippingOutlinedIcon sx={{ color: "#F5A623" }} />

                <Typography variant="h6" fontWeight={700}>
                  Track Your Order
                </Typography>
              </Box>

              <Stepper
                activeStep={getActiveStep(order.orderDate)}
                alternativeLabel
                sx={{
                  mt: 3,
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "#F5A623",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "#43A47A",
                  },
                  "& .MuiStepLabel-label": {
                    fontSize: { xs: 10, sm: 13 },
                  },
                }}
              >
                {steps.map((step) => (
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mt={3}
              >
                {getOrderStatus(order.orderDate).toLowerCase() === "delivered"
                  ? "Your order has been delivered!"
                  : `Your order status is: ${getOrderStatus(order.orderDate)}`}
              </Typography>
            </Paper>

            {/* Reorder Button */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<Inventory2OutlinedIcon />}
              onClick={() => handleReorder(order)}
              sx={{
                py: 1.5,
                borderRadius: 2.5,
                bgcolor: "#F5B120",
                color: "#252525",
                fontWeight: 800,
                fontSize: 15,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#E9A314",
                  boxShadow: "none",
                },
              }}
            >
              REORDER
            </Button>
          </Box>
        ))}
    </Box>
  );
}
