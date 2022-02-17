import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";
import { formDataTypes } from "../pages/UpdatePresetsPage/index";

export async function updatePreset(params: formDataTypes) {
  
  const formData = new FormData();
  
  formData.append("presetId", params.presetTitle);
  formData.append("PrivacyOption", params.PrivacyOption);
  formData.append("tags", params.tags);
  formData.append("thumbnailImg", params.thumbnailImg.thumbnailImgFile);
  formData.append("soundSample", params.soundSample);
  
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:4000",
    //token input
    headers: {
      'Content-type': 'multipart/form-data',
    }
  };

  axiosInstance(config).put(`/preset/update/1`, formData)
    .then((res) => {

    })

}
