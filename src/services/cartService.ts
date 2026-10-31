
import apiClient from "../api/apiClient";
import type { CartItem } from "../interface";

const cartService = {


    getCartItems: async (userId: string): Promise<CartItem[]> => {
        const response = await apiClient.get<CartItem[]>(
            `/cart?userId=${encodeURIComponent(userId)}`
        );

        return response.data;
    },

    addToCart: async (
        cartItem: Omit<CartItem, "id">
    ): Promise<CartItem> => {
        const response = await apiClient.post<CartItem>(
            "/cart",
            cartItem
        );

        return response.data;
    },


    updateQuantity: async (
        id: number,
        quantity: number
    ): Promise<CartItem> => {

        const response = await apiClient.patch<CartItem>(
            `/cart/${id}`,
            { quantity }
        );

        return response.data;
    },

    deleteItem: async (id: number): Promise<void> => {
        await apiClient.delete(`/cart/${id}`);
    },

    clearCart: async (userId: string): Promise<void> => {
        const items = await cartService.getCartItems(userId);

        await Promise.all(
            items.map((item) => cartService.deleteItem(item.id))
        );
    },
};

export default cartService;

