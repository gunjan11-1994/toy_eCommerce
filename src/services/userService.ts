
import apiClient from "../api/apiClient";
import type { Login, Register } from "../interface";

const userService = {

    registerUser: async (userData: Register): Promise<Register> => {
        const response = await apiClient.post<Register>(
            "/Registration",
            userData
        );

        return response.data;
    },

    loginUser: async (
        username: string,
        password: string
    ): Promise<Login | null> => {

        const response = await apiClient.get<Login[]>(
            `/Registration?username=${username}&password=${password}`
        );

        const users = response.data;

        return users.length > 0 ? users[0] : null;
    }

};

export default userService;

