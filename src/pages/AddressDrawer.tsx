import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import type { BillingAddress } from "../interface";
import type { RootState } from "../Redux/store";

import Container from "../di/Container";
import BillingForm from "./BillingForm";

const billingAddressService = Container.billingAddressService;

interface AddressDrawerProps {
  open: boolean;
  onClose: () => void;
  onAddressSelect: (address: BillingAddress) => void;
}

function AddressDrawer({ open, onClose, onAddressSelect }: AddressDrawerProps) {
  const [addresses, setAddresses] = useState<BillingAddress[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<BillingAddress | null>(
    null,
  );
  const userId = useSelector((state: RootState) => state.authentication.userId);
  console.log("Local Storage userId:", localStorage.getItem("userId"));
  console.log("Redux userId:", userId);

  console.log("Logged in userId:", userId);

  useEffect(() => {
    if (!open || !userId) return;

    const loadAddresses = async () => {
      try {
        const data = await billingAddressService.getAddress(userId);

        setAddresses(data);
        setSelectedAddressId(data.length > 0 ? (data[0].id ?? null) : null);
      } catch (error) {
        console.error("Failed to load addresses:", error);
      }
    };

    loadAddresses();
  }, [open, userId]);

  const handleAddressSaved = (savedAddress: BillingAddress) => {
    setAddresses((previousAddresses) => {
      const exists = previousAddresses.some(
        (address) => address.id === savedAddress.id,
      );

      if (exists) {
        return previousAddresses.map((address) =>
          address.id === savedAddress.id ? savedAddress : address,
        );
      }

      return [...previousAddresses, savedAddress];
    });

    setSelectedAddressId(savedAddress.id ?? null);
    setShowSuccess(true);
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: {
            xs: "100vw",
            sm: 450,
          },
          p: 3,
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            {showAddressForm && (
              <Button
                onClick={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
                sx={{
                  mb: 1,
                  px: 0,
                  textTransform: "none",
                  justifyContent: "flex-start",
                }}
              >
                ← Back to addresses
              </Button>
            )}

            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {showAddressForm
                ? editingAddress
                  ? "Edit Address"
                  : "Add New Address"
                : "Select Address"}
            </Typography>
          </Box>

          <IconButton onClick={onClose} aria-label="Close address drawer">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* ADD ADDRESS BUTTON */}
        {showAddressForm ? (
          <Box>
            <BillingForm
              key={editingAddress?.id ?? "new-address"}
              addressToEdit={editingAddress}
              onSaved={handleAddressSaved}
            />
          </Box>
        ) : (
          <>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setEditingAddress(null);
                setShowAddressForm(true);
              }}
              sx={{
                mb: 3,
                py: 1.3,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              + Add New Address
            </Button>

            <RadioGroup
              value={selectedAddressId ?? ""}
              onChange={(event) =>
                setSelectedAddressId(Number(event.target.value))
              }
            >
              {addresses.map((address) => (
                <Paper
                  key={address.id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                    }}
                  >
                    {/* RADIO */}

                    <Radio
                      value={address.id}
                      sx={{
                        p: 0,
                        mt: 0.2,
                      }}
                    />

                    {/* ADDRESS DETAILS */}

                    <Box sx={{ flex: 1 }}>
                      {/* NAME + EDIT + DELETE */}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {address.firstName} {address.lastName}
                        </Typography>

                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setEditingAddress(address);
                              setShowAddressForm(true);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => console.log("Delete address")}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* ADDRESS */}

                      <Typography variant="body2">
                        {address.streetAddress}
                      </Typography>

                      <Typography variant="body2">
                        {address.city}, {address.state} - {address.postcode}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </RadioGroup>
          </>
        )}

        {/* ADDRESS LIST */}

        <Button
          fullWidth
          variant="contained"
          disabled={selectedAddressId === null}
          onClick={() => {
            const selectedAddress = addresses.find(
              (item) => item.id === selectedAddressId,
            );

            if (selectedAddress) {
              onAddressSelect(selectedAddress);
              onClose();
            }
          }}
          sx={{
            mt: 2,
            backgroundColor: "#ff7d80",
            textTransform: "none",
          }}
        >
          Deliver to This Address
        </Button>
      </Box>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ width: "100%" }}
        >
          Address saved successfully!
        </Alert>
      </Snackbar>
    </Drawer>
  );
}

export default AddressDrawer;
