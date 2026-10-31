import { configureStore } from "@reduxjs/toolkit";
import ToyReducer from "./ToySlice"
import authReducer from "./authSlice"
import cartReducer from "./cartSlice";
import BillingReducer from "./billingAddressSlice"

const store = configureStore({
    reducer: {
        toy: ToyReducer,
        authentication: authReducer,
        cart: cartReducer,
        billingAddress: BillingReducer
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>;