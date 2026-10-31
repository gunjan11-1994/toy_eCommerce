import { createSlice } from "@reduxjs/toolkit";
import type { Toy } from "../interface";

const toySlice = createSlice({
    name: "toy",

    initialState: [] as Toy[],

    reducers: {
        setToys: (_state, action) => {
            return action.payload;
        },

        wishList: (state, action) => {
            const toy = state.find((toy) => toy.id === action.payload);

            if (toy) {
                toy.favorite = !toy.favorite;
            }
        },
        removeFromWishlitst: (_state, action) => {
            return _state.filter(
                (toy) => toy.id !== action.payload
            );
        }
    }

});

export const { setToys, wishList, removeFromWishlitst } = toySlice.actions;

export default toySlice.reducer;