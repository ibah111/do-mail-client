import axios from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Error";
import { startModelState } from "../Reducer/Model";
import { DataIncomingState } from "../Types/dataIncoming";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function getGrid<
  T extends keyof DataIncomingState
>(): Promise<DataIncomingState[T]> {
  const changerMode = store.getState().ChangerMode;
  const state = store.getState().Model[changerMode];
  try {
    const response = await axios.post<DataIncomingState[T]>(
      `${server()}/data`,
      {
        ...getToken(),
        ...(state ? state : startModelState),
        changerMode,
      }
    );
    return response.data;
  } catch (e) {
    store.dispatch(
      callError({
        text: "Произошла непредвиденная ошибка",
        params: { variant: "error" },
      })
    );
    throw e;
  }
}
