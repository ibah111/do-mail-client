import { useSnackbar } from "notistack";
import React from "react";
import { useAppSelector } from "../../Reducer";

export default function ErrorHandler() {
  const error = useAppSelector((state) => state.Error);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (error.text) enqueueSnackbar(error.text, error.params);
  }, [error]);
  return <></>;
}
