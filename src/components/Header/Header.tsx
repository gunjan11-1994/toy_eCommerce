import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const navigate = useNavigate();

  // Get translation function and language settings
  const { t, i18n } = useTranslation();

  const [showSearch, setShowSearch] = useState(false);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search") || "";

  // Check whether Hindi is currently selected
  const isHindi = i18n.language.startsWith("hi");

  const navButtonStyle = {
    color: "#000",
    fontSize: "15px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    borderRadius: "5px",
    px: 3,
    "&:hover": {
      backgroundColor: "#F5B120",
      color: "#fff",
    },
  };

  return (
    <Box sx={{ maxWidth: "xl", mx: "auto", p: 2 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#ffffff", color: "#000000" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box>
            <img src={logo} alt={t("logoAlt")} width={170} height={160} />
          </Box>

          {/* Menu */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Button
              component={Link}
              to="/home"
              sx={{
                ...navButtonStyle,
                backgroundColor: "#F5B120",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#F5B120",
                  color: "#fff",
                },
              }}
            >
              {t("nav.home")}
            </Button>

            <Button component={Link} to="/about" sx={navButtonStyle}>
              {t("nav.about")}
            </Button>

            <Button component={Link} to="/shop" sx={navButtonStyle}>
              {t("nav.shop")}
            </Button>

            <Button component={Link} to="/faq" sx={navButtonStyle}>
              {t("nav.faq")}
            </Button>

            <Button component={Link} to="/contact" sx={navButtonStyle}>
              {t("nav.contact")}
            </Button>

            <Button component={Link} to="/wishlist" sx={navButtonStyle}>
              {t("nav.wishlist")}
            </Button>

            <Button component={Link} to="/myOrders" sx={navButtonStyle}>
              {t("nav.orders")}
            </Button>

            {/* Search input */}
            {showSearch && (
              <TextField
                size="small"
                placeholder={t("search.placeholder")}
                value={searchText}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value.trim() === "") {
                    navigate("/shop");
                  } else {
                    navigate(`/shop?search=${encodeURIComponent(value)}`);
                  }
                }}
                sx={{
                  width: 200,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}

            {/* Search button */}
            <IconButton
              onClick={() => setShowSearch(!showSearch)}
              sx={{
                backgroundColor: "#F5B120",
                color: "#fff",
                borderRadius: 2,
                width: 50,
                height: 50,
                "&:hover": {
                  backgroundColor: "#07286a",
                  color: "#fff",
                },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* Language switch button */}
            <Button
              onClick={() => i18n.changeLanguage(isHindi ? "en" : "hi")}
              sx={{
                ...navButtonStyle,
                border: "1px solid #F5B120",
                "&:hover": {
                  border: "1px solid #F5B120",
                  backgroundColor: "#FFF8E6",
                },
              }}
            >
              {isHindi ? "English" : "हिन्दी"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
