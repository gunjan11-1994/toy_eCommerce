import apiClient from "../api/apiClient";
import type { Order } from "../interface";

const orderService = {
    createOrder: async (order: Order): Promise<Order> => {
        const response = await apiClient.post<Order>(
            "/orders",
            order
        );

        return response.data;
    },

    getOrders: async (userId: string | number): Promise<Order[]> => {
        const response = await apiClient.get<Order[]>(
            `/orders?userId=${userId}`
        );

        return response.data;
    },
};

export default orderService;