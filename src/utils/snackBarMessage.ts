import React from "react";
import { useSnackbar, WithSnackbarProps, OptionsObject } from "notistack";

let snackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

export enum SnackBarMessageType {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
}

type SnackBarParams = {
  type: SnackBarMessageType;
  message: string;
  options?: OptionsObject;
};

export default function alertSnackBarMessage(config: SnackBarParams) {
  snackbarRef.enqueueSnackbar(config.message, {
    variant: config.type,
    ...config.options,
  });
}
