import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

const useGetDataQuery = ({ queryKey, url, config }) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await axiosInstance.get(url, config);
            return response.data;
        },
    });
};

export default useGetDataQuery;
