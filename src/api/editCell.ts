import axios from "axios";
import moment from "moment";
import { store } from "../Reducer";
import { callError } from "../Reducer/Error";
import { startModelState } from "../Reducer/Model";
import { DataIncomingState } from "../Types/dataIncoming";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function editCell<T extends keyof DataIncomingState>(
  id: number,
  name: string,
  data: any
): Promise<DataIncomingState[T]> {
  let value: string = data;
  if (data instanceof Date) {
    value = moment(data).toISOString();
  }
  const ChangerMode = store.getState().Stater.ChangerMode;
  const ArhiveType = store.getState().Stater.ArhiveType;
  try {
    const response = await axios.post<DataIncomingState[T]>(
      `${server()}/edit`,
      {
        ...getToken(),
        id,
        name,
        value,
        ChangerMode,
        ArhiveType,
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
