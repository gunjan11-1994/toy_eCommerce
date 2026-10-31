import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { setCart } from "../Redux/cartSlice";
import cartService from "../services/cartService";
import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";
import CommonButton from "../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../Redux/store";
import orderService from "../services/orderService";
import { clearCart } from "../Redux/cartSlice";
import { setBillingAddress } from "../Redux/billingAddressSlice";
import type { CartItem, BillingAddress } from "../interface";

function Checkout() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const cartItem = useSelector((state: RootState) => state.cart);
  const billingAddress = useSelector(
    (state: RootState) => state.billingAddress,
  );

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        dispatch(setCart([]));
        return;
      }

      try {
        const data = await cartService.getCartItems(userId);

        dispatch(setCart(data));
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };

    loadCart();
  }, [dispatch, userId]);

  console.log("cartItem:", cartItem);

  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  if (cartItem.length === 0) {
    console.log("Cart is empty");
    return;
  }

  if (billingAddress.length === 0) {
    console.log("Please submit billing address first");
    return;
  }

  const address = billingAddress[0];

  const total = cartItem.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const order = {
    userId: address.userId,
    billingAddressId: address.id ?? null,
    billingAddress: address,
    items: cartItem,
    total: total,
    status: "Placed",
    orderDate: new Date().toISOString(),
  };

  try {
    const savedOrder = await orderService.createOrder(order);

    console.log("Order created:", savedOrder);

    await cartService.clearCart(userId);

    dispatch(clearCart());

    navigate("/orderPlaced");
  } catch (error) {
    console.error("Failed to place order:", error);
  }
};

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        py: 2,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: {
            xs: "100%",
            lg: "83.333333%", // Bootstrap col-10 equivalent
          },
          mx: "auto",
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Coupon */}
        <Box
          sx={{
            border: "1px solid #00b7b3",
            borderRadius: "12px",
            backgroundColor: "#eefafa",
            px: 2,
            py: 2,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              color: "#333",
            }}
          >
            Have a coupon?{" "}
            <Typography
              component="span"
              sx={{
                color: "#00aaa6",
                cursor: "pointer",
              }}
            >
              Click here to enter your code
            </Typography>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* LEFT SIDE */}
          <Grid size={{ xs: 12, md: 8 }}>
            <BillingForm
              addressToEdit={billingAddress[0] ?? null}
              onSaved={(address: BillingAddress) =>
                dispatch(setBillingAddress(address))
              }
            />
          </Grid>

          {/* RIGHT SIDE */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Your Order */}
            <OrderSummary />

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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Checkout;
