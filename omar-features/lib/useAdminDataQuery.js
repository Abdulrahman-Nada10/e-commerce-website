import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

const useAdminDataQuery = ({ queryKey, url, config, refetchInterval }) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await axiosInstance.get(url, config);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchInterval: refetchInterval || false, // Enable periodic refetch if provided
        refetchOnWindowFocus: false, // Avoid unnecessary refetches
        retry: 2, // Retry failed requests
    });
};

export default useAdminDataQuery;
