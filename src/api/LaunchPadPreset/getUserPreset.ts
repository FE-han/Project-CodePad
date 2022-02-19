import { AxiosRequestConfig } from "axios";
import alertSnackBarMessage, {
  SnackBarMessageType,
} from "../../utils/snackBarMessage";
import { axiosInstance } from "../axiosInstance";

interface GetUserPresetParams {
  userId?: string;
  presetId?: string;
}

export async function getUserPreset(params: GetUserPresetParams) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(
    `/presets/${params.userId}/${
      params.presetId === "enter" ? "" : params.presetId
    }`
  );

  return response.data;
}
