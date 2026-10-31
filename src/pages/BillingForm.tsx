import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { BillingAddress } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import CommonButton from "../components/Common/CommonButton";
import billingAddressService from "../services/billingAddressService";
import { setBillingAddress } from "../Redux/billingAddressSlice";

interface BillingFormProps {
  addressToEdit: BillingAddress | null;
  onSaved: (savedAddress: BillingAddress) => void;
}

function BillingForm({ addressToEdit, onSaved }: BillingFormProps) {
  // Get the logged-in user's ID from Redux
  const userId = useSelector((state: RootState) => state.authentication.userId);

  const dispatch = useDispatch();

  // Form data does not contain userId
  type BillingFormData = Omit<BillingAddress, "userId" | "id">;

  const emptyAddress: BillingFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    orderNotes: "",
  };
  // Start with the selected address in Edit mode,
  // or blank fields in Add mode.
  const [billingAddress, setFormBillingAddress] = useState<BillingFormData>(
    addressToEdit
      ? {
          firstName: addressToEdit.firstName,
          lastName: addressToEdit.lastName,
          email: addressToEdit.email,
          phone: addressToEdit.phone,
          country: addressToEdit.country,
          streetAddress: addressToEdit.streetAddress,
          city: addressToEdit.city,
          state: addressToEdit.state,
          postcode: addressToEdit.postcode,
          orderNotes: addressToEdit.orderNotes,
        }
      : emptyAddress,
  );

  const [addressId, setAddressId] = useState<number | null>(
    addressToEdit?.id ?? null,
  );

  // Update the form when the user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormBillingAddress((previousAddress) => ({
      ...previousAddress,
      [name]: value,
    }));
  };

  // Save a new address or update an existing address
  const handleAddForm = async () => {
    if (!userId) {
      console.log("No logged-in user");
      return;
    }

    const addressToSave: BillingAddress = {
      ...billingAddress,
      userId,
    };

    console.log("Final object being sent:", addressToSave);

    try {
      let savedAddress: BillingAddress;

      if (addressId !== null) {
        // Edit mode: update the existing address
        savedAddress = await billingAddressService.updateAddress(
          addressId,
          addressToSave,
        );

        console.log("Updated address:", savedAddress);
      } else {
        // Add mode: create a new address
        savedAddress = await billingAddressService.saveAddress(addressToSave);

        console.log("New address:", savedAddress);

        setAddressId(savedAddress.id ?? null);
      }

      dispatch(setBillingAddress(savedAddress));

      // Send the saved address back to AddressDrawer
      onSaved(savedAddress);
    } catch (error) {
      console.error("Billing address error:", error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        p: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "#071c3d",
        }}
      >
        Billing Details
      </Typography>

      <Grid container spacing={2}>
        {/* First Name */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter your first name"
            name="firstName"
            value={billingAddress.firstName}
            onChange={handleChange}
          />
        </Grid>

        {/* Last Name */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter your last name"
            name="lastName"
            value={billingAddress.lastName}
            onChange={handleChange}
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={billingAddress.email}
            onChange={handleChange}
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phone"
            value={billingAddress.phone}
            onChange={handleChange}
          />
        </Grid>

        {/* Country */}
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>

            <Select
              label="Country"
              name="country"
              value={billingAddress.country}
              onChange={(e) =>
                setFormBillingAddress((previousAddress) => ({
                  ...previousAddress,
                  country: e.target.value,
                }))
              }
            >
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="india">India</MenuItem>
              <MenuItem value="usa">United States</MenuItem>
              <MenuItem value="uk">United Kingdom</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Street Address */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Street Address"
            placeholder="House number and street name"
            name="streetAddress"
            value={billingAddress.streetAddress}
            onChange={handleChange}
          />
        </Grid>

        {/* City */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="City"
            placeholder="Enter your city"
            name="city"
            value={billingAddress.city}
            onChange={handleChange}
          />
        </Grid>

        {/* State */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="State"
            placeholder="Enter your state"
            name="state"
            value={billingAddress.state}
            onChange={handleChange}
          />
        </Grid>

        {/* Postcode */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Postcode / ZIP"
            placeholder="Enter postcode"
            name="postcode"
            value={billingAddress.postcode}
            onChange={handleChange}
          />
        </Grid>

        {/* Order Notes */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Order Notes"
            placeholder="Notes about your order, e.g. special instructions"
            name="orderNotes"
            value={billingAddress.orderNotes}
            onChange={handleChange}
          />
        </Grid>

        <CommonButton
          text="Submit"
          backColor="#ff7d80"
          color="white"
          onClick={handleAddForm}
        />
      </Grid>
    </Paper>
  );
}

export default BillingForm;
