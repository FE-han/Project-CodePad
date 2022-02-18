import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export async function postPresetSoundSampleData(params: FormData) {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance(config).post(
    "/presets/soundUpload",
    params
  );
  console.log(response);
  return response.data;
}
