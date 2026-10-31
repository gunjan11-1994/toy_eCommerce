import { Box, Button, Typography } from "@mui/material";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorMessage({
  message = "We couldn't load the toys right now.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 450,
          padding: "45px 40px",
          borderRadius: 4,
          backgroundColor: "#fff8f8",
          border: "1px dashed #ff8585",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            width: 70,
            height: 70,
            margin: "0 auto 20px",
            borderRadius: "50%",
            backgroundColor: "#ffe4e4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          🧸
        </Box>

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
            color: "#333",
            fontFamily: '"Baloo 2", sans-serif',
            mb: 1,
          }}
        >
          Oops! Something went wrong
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            color: "#777",
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          {message}
        </Typography>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="contained"
            sx={{
              backgroundColor: "#ff8585",
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              padding: "9px 30px",
              fontSize: 15,

              "&:hover": {
                backgroundColor: "#ff7070",
              },
            }}
          >
            Try Again
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ErrorMessage;
