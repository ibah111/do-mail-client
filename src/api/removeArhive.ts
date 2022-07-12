import axios from "axios";
import { store } from "../Reducer";
import { callSuccess } from "../Reducer/Error";
import { ArhiveState, setReload } from "../Reducer/Stater";
import getErrorAxios from "../utils/getErrorAxios";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
import { setData } from "../Reducer/Model";

export default async function removeArhive(): Promise<null> {
  const ChangerMode = store.getState().Stater.ChangerMode;
  const ArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[ChangerMode];
  try {
    const response = await axios.post<null>(`${server()}/arhive/remove`, {
      ...getToken(),
      select: state.selectionModel,
      ArhiveType,
    });
    store.dispatch(callSuccess("Операция успешно выплнено"));
    store.dispatch(setData([ChangerMode, "selectionModel", []]));
    store.dispatch(setReload(true));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
