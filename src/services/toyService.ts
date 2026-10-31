
import apiClient from "../api/apiClient";
import type { Toy, WishlistItem } from "../interface";



const toyService = {
    getToys: async (): Promise<Toy[]> => {
        const response = await apiClient.get<Toy[]>("/toys");
        return response.data;
    },

    getWishlist: async (userId: string): Promise<WishlistItem[]> => {
        const response = await apiClient.get<WishlistItem[]>(
            `/wishlists?userId=${encodeURIComponent(userId)}`,
        );

        return response.data;
    },

    updateFavorite: async (
        toyId: number,
        favorite: boolean,
        userId: string,
    ): Promise<void> => {
        const response = await apiClient.get<WishlistItem[]>(
            `/wishlists?userId=${encodeURIComponent(userId)}&toyId=${toyId}`,
        );

        const existingItem = response.data[0];

        if (favorite && !existingItem) {
            await apiClient.post("/wishlists", {
                userId,
                toyId,
            });
        }

        if (!favorite && existingItem) {
            await apiClient.delete(`/wishlists/${existingItem.id}`);
        }
    },
};

export default toyService;
