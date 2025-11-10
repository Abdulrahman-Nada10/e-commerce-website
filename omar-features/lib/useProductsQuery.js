import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useProductsQuery = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosInstance.get("/products");
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
        refetchOnWindowFocus: false,
        retry: 2,
    });
};

export const useOrdersQuery = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await axiosInstance.get("/orders");
            return response.data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
        cacheTime: 5 * 60 * 1000, // 5 minutes
        refetchInterval: 15 * 1000, // Refetch every 15 seconds for faster order updates
        refetchOnWindowFocus: false,
        retry: 2,
    });
};

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosInstance.get("/categories");
            return response.data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
        cacheTime: 20 * 60 * 1000, // 20 minutes
        refetchInterval: 60 * 1000, // Refetch every minute
        refetchOnWindowFocus: false,
        retry: 2,
    });
};
