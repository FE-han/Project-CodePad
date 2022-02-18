import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from "./axiosInstance";



export interface GetTags{
    tags: string,
}

export async function getTags(params: GetTags){
    const config: AxiosRequestConfig = {
        baseURL: "http://localhost:3001",
    };

    console.log(params)

    const response = await axiosInstance(config).get(
        `/tags=${params.tags}`
    )
    return response.data;
}