import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../interface";

const cartSlice = createSlice({
    name: "cart",

    initialState: [] as CartItem[],

    reducers: {

        addToCart: (state, action) => {
            const existingItem = state.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.push(action.payload);
            }
        },

        setCartItems: (_state, action) => {
            return action.payload;
        },

        removeFromCart: (state, action) => {
            return state.filter((toy) => toy.id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            const item = state.find((toy) => toy.id === action.payload);

            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.find((toy) => toy.id === action.payload);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        setCart: (_state, action) => {
            return action.payload;
        },
        clearCart: () => [],
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart, clearCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;