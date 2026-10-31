
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    userId: string | null;
    username: string;
}

const authSlice = createSlice({
    name: "authentication",

    initialState: {
        isLoggedIn: !!localStorage.getItem("username"),
        userId: localStorage.getItem("userId") || null,
        username: localStorage.getItem("username") || "",
    } as AuthState,

    reducers: {
        login: (
            state,
            action: PayloadAction<{
                userId: string;
                username: string;
            }>
        ) => {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.username = action.payload.username;

            localStorage.setItem("userId", action.payload.userId);
            localStorage.setItem("username", action.payload.username);
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.username = "";

            localStorage.removeItem("userId");
            localStorage.removeItem("username");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

