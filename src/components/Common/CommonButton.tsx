import { Button, type SxProps, type Theme } from "@mui/material";

interface CommonButtonProps {
  text: string;
  backColor: string;
  color: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

function CommonButton({
  text,
  color,
  backColor,
  sx,
  onClick,
}: CommonButtonProps) {
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          bgcolor: backColor,
          color: color,
          fontSize: "18px",
          fontWeight: 600,
          shadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: 3, // Square
          px: 4, // horizontal padding
          py: 1.5, // vertical padding
          fontFamily: '"Baloo 2", sans-serif',
          ...sx,
        }}
        onClick={onClick}
        size="large"
      >
        {text}
      </Button>
    </div>
  );
}
export default CommonButton;
