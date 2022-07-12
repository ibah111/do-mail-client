import axios from "axios";
import { store } from "../Reducer";
import { callSuccess } from "../Reducer/Error";
import { ArhiveState } from "../Reducer/Stater";
import getErrorAxios from "../utils/getErrorAxios";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
import { setData } from "../Reducer/Model";

export default async function addArhive(
  ArhiveType: ArhiveState
): Promise<null> {
  const ChangerMode = store.getState().Stater.ChangerMode;
  const state = store.getState().Model[ChangerMode];
  try {
    const response = await axios.post<null>(`${server()}/arhive/add`, {
      ...getToken(),
      select: state.selectionModel,
      ArhiveType,
    });
    store.dispatch(callSuccess("Операция успешно выплнено"));
    store.dispatch(setData([ChangerMode, "selectionModel", []]));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
