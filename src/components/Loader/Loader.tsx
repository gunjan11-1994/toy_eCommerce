import { Box } from "@mui/material";
import logo from "../../assets/logo.jpg";

function Loader() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 150,
          height: 150,
        }}
      >
        {/* Orbiting stars and dots */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            animation: "rotate 3s linear infinite",

            "@keyframes rotate": {
              from: {
                transform: "rotate(0deg)",
              },
              to: {
                transform: "rotate(360deg)",
              },
            },
          }}
        >
          {/* Stars */}
          <Box
            component="span"
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              fontSize: 20,
              animation: "twinkle 1s ease-in-out infinite alternate",

              "@keyframes twinkle": {
                from: {
                  transform: "scale(0.7)",
                  opacity: 0.5,
                },
                to: {
                  transform: "scale(1.2)",
                  opacity: 1,
                },
              },
            }}
          >
            ★
          </Box>

          <Box
            component="span"
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              fontSize: 18,
            }}
          >
            ✦
          </Box>

          <Box
            component="span"
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              fontSize: 20,
            }}
          >
            ★
          </Box>

          <Box
            component="span"
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              fontSize: 18,
            }}
          >
            ✦
          </Box>

          {/* Dots */}
          <Box
            sx={{
              position: "absolute",
              top: 25,
              right: 25,
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#f5b400",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 25,
              left: 25,
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#ff6b6b",
            }}
          />
        </Box>

        {/* Center Logo */}
        <Box
          component="img"
          src={logo}
          alt="Loading"
          sx={{
            position: "absolute",
            width: 85,
            height: 85,
            objectFit: "contain",
            borderRadius: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            animation: "pulse 1.5s ease-in-out infinite",

            "@keyframes pulse": {
              "0%": {
                transform: "translate(-50%, -50%) scale(1)",
              },
              "50%": {
                transform: "translate(-50%, -50%) scale(1.08)",
              },
              "100%": {
                transform: "translate(-50%, -50%) scale(1)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Loader;
