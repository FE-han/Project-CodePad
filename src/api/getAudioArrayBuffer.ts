import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export async function getAudioArrayBuffer(url: string) {
  const config: AxiosRequestConfig = {
    //token input
  };

  const response = await axiosInstance(config).get(url, {
    responseType: "arraybuffer",
  });

  console.log(response.data);
  return response.data;
}
