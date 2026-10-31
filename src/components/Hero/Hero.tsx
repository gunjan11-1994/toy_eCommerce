import { Box, Typography, Button } from "@mui/material";
import heroImage from "../../assets/hero8.jpg";

function Hero() {
  return (
    <Box
      sx={{
        "& .MuiTypography-root": {
          fontFamily: '"Baloo 2", sans-serif',
        },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        color: "#f54242",
        textAlign: "right",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", width: "80%", letterSpacing: 2 }}
        >
          PICK THE BEST TOY FOR YOUR KIDS
        </Typography>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{ fontWeight: "bold", width: "80%" }}
        >
          Make play time a blast with our finest toys and games!
        </Typography>
        <br />
        <Box sx={{ width: "80%" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff8b82",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              shadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: 2, // Square
              px: 4, // horizontal padding
              py: 1.5, // vertical padding
              fontFamily: '"Baloo 2", sans-serif',
            }}
            size="large"
          >
            PURCHASE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
