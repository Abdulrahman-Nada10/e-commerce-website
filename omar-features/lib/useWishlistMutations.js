import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import useGetDataQuery from "./useGetDataQuery";

export const useAddToWishlistMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId) => {
            // const { data } = await axiosInstance.post("/v1/wishlist", { productId });
            // return data;
            // Fake data implementation
            // return new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve({ success: true, message: "Product added to wishlist" });
            //     }, 500);
            // });
            return new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error("Fake error: failed to add to wishlist"));
  }, 500);
});

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
        onError: (error) => {
            console.error("Error adding to wishlist:", error);
        },
    });
};

export const useRemoveFromWishlistMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId) => {
            // const { data } = await axiosInstance.delete(`/v1/wishlist/${productId}`);
            // return data;
            // Fake data implementation
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message: "Product removed from wishlist" });
                }, 500);
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
        onError: (error) => {
            console.error("Error removing from wishlist:", error);
        },
    });
};

export const useGetWishlistQuery = () => {
    return useGetDataQuery({
        queryKey: ["wishlist"],
        url: "/v1/wishlist",
        config: {
            adapter: (config) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const fakeWishlist = [
                            {
                                id: 1,
                                title: "Wireless Bluetooth Headphones",
                                price: 89.99,
                                description: "High-quality wireless headphones with noise cancellation",
                                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                            },
                            {
                                id: 2,
                                title: "Smart Watch",
                                price: 199.99,
                                description: "Fitness tracking smartwatch with heart rate monitor",
                                image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
                            },
                            {
                                id: 3,
                                title: "iPhone 13 Pro",
                                price: 999.99,
                                description: "Latest Apple smartphone with advanced camera system",
                                image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
                            }
                            


                        ];
                        resolve({
                            data: fakeWishlist,
                            status: 200,
                            statusText: "OK",
                            headers: {},
                            config,
                        });
                    }, 800);
                });
            },
        },
    });
};
