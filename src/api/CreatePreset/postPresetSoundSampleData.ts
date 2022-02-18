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

  return { data: response.data, status: response.status };
}
