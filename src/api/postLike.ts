import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface postLikeParams{
    isClicked: boolean,
}

export async function postLike(params: postLikeParams){
    const config: AxiosRequestConfig = {
        baseURL: "http://localhost:3001",
    };

    const data = {
        isClicked: params.isClicked,
    }

    const response = await axiosInstance(config).post(
        `/presets`,data
    )
        return response.data;
}