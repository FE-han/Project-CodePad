import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export async function updatePreset(formData: any, presetId: string) {
  
  const config: AxiosRequestConfig = {
    //token input
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  return axiosInstance(config).put(`/preset/update/${presetId}`, formData).then(res => console.log(res.status))
}
