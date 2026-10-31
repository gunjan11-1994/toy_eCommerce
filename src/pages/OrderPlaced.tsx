import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/Common/CommonButton";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
        px: 2,
        py: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#fff",
          borderRadius: "24px",
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 5 },
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Toy Icon */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#fff4e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            fontSize: "52px",
          }}
        >
          🧸
        </Box>

        {/* Success Message */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#071c3d",
            mb: 1.5,
            fontSize: {
              xs: "26px",
              sm: "32px",
            },
          }}
        >
          Yay! Your Order is Placed! 🎉
        </Typography>

        <Typography
          sx={{
            color: "#667085",
            fontSize: "15px",
            lineHeight: 1.8,
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          Your little toy adventure is on its way! 🧸✨
          <br />
          We have received your order successfully and
          <br />
          will start preparing it soon.
        </Typography>

        {/* Order Status */}
        <Box
          sx={{
            backgroundColor: "#eefafa",
            borderRadius: "14px",
            px: 4,
            py: 2,
            mt: 3,
            mb: 3,
            display: "inline-block",
            minWidth: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              color: "#667085",
              mb: 0.5,
            }}
          >
            Order Status
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#00aaa6",
            }}
          >
            ✓ Confirmed
          </Typography>
        </Box>

        {/* Thank You */}
        <Typography
          sx={{
            color: "#555",
            fontSize: "14px",
            mb: 3,
          }}
        >
          Thank you for choosing Toys House! 💕
        </Typography>

        {/* Continue Shopping */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CommonButton
            text="Continue Shopping"
            backColor="#ff7d80"
            color="white"
            onClick={() => navigate("/shop")}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default OrderPlaced;
