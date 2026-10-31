
import apiClient from "../api/apiClient";
import type { BillingAddress } from "../interface";

const billingAddressService = {

    getAddress: async (userId: string): Promise<BillingAddress[]> => {
        const response = await apiClient.get<BillingAddress[]>(
            `/billingAddresses?userId=${userId}`
        );

        return response.data;
    },

    saveAddress: async (
        address: BillingAddress
    ): Promise<BillingAddress> => {

        const response = await apiClient.post<BillingAddress>(
            "/billingAddresses",
            address
        );

        return response.data;
    },

    updateAddress: async (
        id: number,
        address: BillingAddress
    ): Promise<BillingAddress> => {

        const response = await apiClient.patch<BillingAddress>(
            `/billingAddresses/${id}`,
            address
        );

        return response.data;
    },

    deleteAddress: async (id: number): Promise<void> => {
        await apiClient.delete(`/billingAddresses/${id}`);
    },

};

export default billingAddressService;

