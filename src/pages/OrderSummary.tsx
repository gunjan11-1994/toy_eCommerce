import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { formatCurrency } from "../utils/formatters";
import type { RootState } from "../Redux/store";

function OrderSummary() {
  const cartItem = useSelector((state: RootState) => state.cart);

  const total = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Your Order */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#071c3d",
            mb: 3,
          }}
        >
          Your order
        </Typography>

        {/* Order Table */}
        <Box
          sx={{
            border: "1px solid #d8dce2",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1.5,
              py: 1.5,
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            <Typography>Product</Typography>
            <Typography>Subtotal</Typography>
          </Box>

          {/* Products */}
          {cartItem.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                px: 1.5,
                py: 1,
              }}
            >
              <Typography fontSize="16px" fontWeight={700}>
                {item.name} × {item.quantity}
              </Typography>

              <Typography
                fontSize="16px"
                fontWeight={700}
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                {formatCurrency(item.price * item.quantity)}
              </Typography>
            </Box>
          ))}

          {/* Subtotal */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1.5,
              py: 1.5,
              borderBottom: "1px solid #d8dce2",
            }}
          >
            <Typography fontWeight={700} fontSize="16px">
              Subtotal
            </Typography>

            <Typography fontWeight={700} fontSize="16px">
              {formatCurrency(total)}
            </Typography>
          </Box>

          {/* Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1.5,
              py: 1.5,
            }}
          >
            <Typography fontWeight={500} fontSize="16px">
              Total
            </Typography>

            <Typography fontWeight={500} fontSize="16px">
              {formatCurrency(total)}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Payment Box */}
      <Box
        sx={{
          mt: 2,
          backgroundColor: "#eefafa",
          borderRadius: "4px",
          p: 2,
        }}
      >
        <Typography fontSize="13px" color="#555" mb={2}>
          Cash on delivery
        </Typography>

        <Box
          sx={{
            backgroundColor: "#ddd9e4",
            px: 2,
            py: 1.5,
            mb: 3,
            position: "relative",

            "&::before": {
              content: '""',
              position: "absolute",
              top: "-10px",
              left: "30px",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid #ddd9e4",
            },
          }}
        >
          <Typography fontSize="13px">Pay with cash upon delivery.</Typography>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #d5e5e5",
            pt: 2,
          }}
        >
          <Typography fontSize="13px" lineHeight={1.7} color="#547080">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <Typography
              component="span"
              sx={{
                color: "#00aaa6",
              }}
            >
              privacy policy
            </Typography>
            .
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            {/* Place order button can be added here later */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OrderSummary;
