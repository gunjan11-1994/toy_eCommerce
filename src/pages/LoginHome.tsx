import { Box, Typography } from "@mui/material";
import hero3 from "../../src/assets/logo.jpg";
import CommonButton from "../components/Common/CommonButton";

interface LoginHomeProps {
  onLoginClick: () => void;
}

function LoginHome({ onLoginClick }: LoginHomeProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 3, md: 8 },
        gap: 5,
      }}
    >
      {/* Hero Image */}
      <Box
        sx={{
          width: { xs: "100%", md: "55%" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={hero3}
          alt="Toys"
          sx={{
            width: "100%",
            maxWidth: "700px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Text + Button */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          textAlign: { xs: "center", md: "right" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Baloo 2", sans-serif',
            fontWeight: 800,
            color: "#f37e7e",
            fontSize: { xs: "2.5rem", md: "4rem" },
            lineHeight: 1.1,
          }}
        >
          LET THE FUN BEGIN!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontFamily: '"Baloo 2", sans-serif',
            color: "#555",
            lineHeight: 1.5,
          }}
        >
          Login to explore a wonderful world of toys made for little adventures!
        </Typography>

        <Box sx={{ mt: 2 }}>
          <CommonButton
            text="Login"
            color="white"
            backColor="#f37e7e"
            sx={{
              mt: 2,
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: "30px",
            }}
            onClick={onLoginClick}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginHome;
