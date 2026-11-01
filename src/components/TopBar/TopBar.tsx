import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { Badge } from "@mui/material";
import type { RootState } from "../../Redux/store";

interface HeaderProps {
  onLoginClick: () => void;
  onRegitrsationClick: () => void;
}

const TopBar = ({ onLoginClick, onRegitrsationClick }: HeaderProps) => {
  const dispatch = useDispatch();
  const username = useSelector(
    (state: RootState) => state.authentication.username,
  );
  const isLoggedIn = useSelector(
    (state: RootState) => state.authentication.isLoggedIn,
  );

  const cartItems = useSelector((state: RootState) => state.cart);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      {" "}
      {/* Top Bar */}
      <Box
        className="top-bar"
        sx={{
          px: 5,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          Contact Us on: 800 123-4567 or{" "}
          <a
            href="mailto:support@themerex.net"
            style={{ color: "#f9a825", textDecoration: "none" }}
          >
            support@themerex.net
          </a>
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<PersonAddIcon />}
            onClick={onRegitrsationClick}
          >
            Register
          </Button>

          <Button
            variant="contained"
            color="warning"
            startIcon={<LoginIcon />}
            onClick={onLoginClick}
          >
            Login
          </Button>

          {isLoggedIn ? (
            <Button
              variant="contained"
              color="success"
              startIcon={
                <Badge badgeContent={cartCount} color="warning">
                  <ShoppingCartIcon />
                </Badge>
              }
              component={Link}
              to="/cart"
            >
              Cart
            </Button>
          ) : (
            ""
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {isLoggedIn ? (
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  fontFamily: '"Baloo 2", sans-serif',
                }}
              >
                Hello, {username}
              </Typography>
            ) : (
              ""
            )}
          </Box>

          {isLoggedIn ? (
            <Button
              variant="contained"
              color="info"
              startIcon={<LogoutIcon />}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
