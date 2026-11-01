import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  Grow,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "../Common/CommonButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../pages/auth/useAuth.ts";

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

function LoginForm({ open, onClose, onLoginSuccess }: LoginFormProps) {
  const { login } = useAuth();
  // const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  console.log("username:", username);

  // Field validation errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // General login/API error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async () => {
    // Validate empty fields
    const newErrors = {
      username: username ? "" : "username is required",
      password: password ? "" : "Password is required",
    };

    setErrors(newErrors);

    // Stop if any field has an error
    if (newErrors.username || newErrors.password) {
      return;
    }

    try {
      // // const user = await userService.loginUser(username, password);
      // // console.log("Logged in user:", user);
      // // console.log("USER ID:", user?.id);

      // if (user) {
      //   // Clear form
      //   setusername("");
      //   setPassword("");

      //   // Clear errors
      //   setErrors({
      //     username: "",
      //     password: "",
      //   });

      //   setError("");
      await login(username, password);

      onClose();
      onLoginSuccess();
      navigate("/home");
      // } else {
      //   setError("Invalid username or password");
      // }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{
        transition: Grow,
      }}
      slotProps={{
        transition: {
          timeout: 600,
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
        paper: {
          sx: {
            width: 700,
            maxWidth: "90vw",
          },
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            width: "100%",
            p: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tooltip title="Close" placement="top">
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="h3" mb={2}>
            Step into Style!
          </Typography>

          <Typography variant="h6" mb={2} sx={{ textAlign: "center" }}>
            Login using mahajangunjan and password is CuteSpring11
          </Typography>

          {/* General login error */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="username"
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "40px",
              },
            }}
            value={username}
            onChange={(e) => {
              setusername(e.target.value);

              // Remove username error when user starts typing
              setErrors((prev) => ({
                ...prev,
                username: "",
              }));
            }}
          />

          <TextField
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "40px",
              },
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              // Remove password error when user starts typing
              setErrors((prev) => ({
                ...prev,
                password: "",
              }));
            }}
          />

          <CommonButton
            text="Login"
            color="white"
            backColor="#f37e7e"
            sx={{ mt: 4 }}
            onClick={handleSubmitLogin}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LoginForm;
