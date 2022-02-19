import { AxiosRequestConfig } from "axios";
import { formDataTypes } from "../pages/HandleMyPresetPage";
import { axiosInstance } from "./axiosInstance";

export async function updatePreset(formData: any, presetId: string) {
  
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:4200",
    //token input
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  return axiosInstance(config).put(`/preset/update/${presetId}`, formData).then(res => console.log(res.status))
}
