
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BillingAddress } from "../interface";

const billingAddressSlice = createSlice({
    name: "billingAddress",

    initialState: [] as BillingAddress[],

    reducers: {
        setBillingAddress: (
            _state,
            action: PayloadAction<BillingAddress>
        ) => {
            return [action.payload];
        },

        clearBillingAddress: () => {
            return [];
        },
    },
});

export default billingAddressSlice.reducer;

export const {
    setBillingAddress,
    clearBillingAddress,
} = billingAddressSlice.actions;
