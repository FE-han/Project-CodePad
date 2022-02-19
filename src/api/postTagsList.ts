import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface postTagsListParams{
    text: string,
}

export async function postTagsList(params: postTagsListParams){
    const config: AxiosRequestConfig = {
        baseURL: "http://localhost:3001",
    };

    const data = {
        text: params.text,
    }

    const response = await axiosInstance(config).post(
        `/postTags`,data
    )

    return response.data;
}