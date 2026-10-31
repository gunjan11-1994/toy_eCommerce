import {
  Box,
  Dialog,
  DialogContent,
  Grow,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "../Common/CommonButton.tsx";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm.tsx";
import Container from "../../di/Container.ts";

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
}

function RegistrationForm({ open, onClose }: LoginFormProps) {
  const [Fname, setFname] = useState<string>("");
  const [Lname, setLname] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginOpen, setLoginOpen] = useState(false);
  const userService = Container.userService;

  const handleRegister = async () => {
    const registerInfo = {
      id: Date.now(),
      Fname: Fname,
      Lname: Lname,
      username: username,
      email: email,
      password: password,
    };

    try {
      await userService.registerUser(registerInfo);

      // Clear form
      setFname("");
      setLname("");
      setusername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
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

            <Typography variant="h3" mb={2} sx={{ textAlign: "center" }}>
              Sign Up for a Stylish Journey !
            </Typography>
            <Typography variant="h6" mb={2} sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Typography
                component="span"
                onClick={() => {
                  onClose();
                  setLoginOpen(true);
                }}
                sx={{
                  cursor: "pointer",
                  color: "#f37e7e",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Typography>
            </Typography>

            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                },
              }}
              value={Fname}
              onChange={(e) => setFname(e.target.value)}
            />

            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                },
              }}
              value={Lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <TextField
              label="username"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                },
              }}
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <CommonButton
              text="Sign Up"
              color="white"
              backColor="#f37e7e"
              sx={{ mt: 4 }}
              onClick={handleRegister}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <LoginForm
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => setLoginOpen(false)}
      />
    </>
  );
}

export default RegistrationForm;
