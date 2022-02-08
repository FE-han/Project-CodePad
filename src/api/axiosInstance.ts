import axios, { AxiosRequestConfig } from "axios";

export function axiosInstance(config: AxiosRequestConfig) {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
    timeout: 20 * 1000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });
  return axiosInstance;
}
