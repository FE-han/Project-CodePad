import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface PresetParams {
    presetId: string;
    presetTitle: string;
    id: string;
}

export async function getPresetListInfo(params: any){
    const config : AxiosRequestConfig = {
        //token input
        baseURL : 'http://localhost:3001'
    }
    console.log(params);
    const response = await axiosInstance(config).get(`/userInfo/`);

    return response.data;
}