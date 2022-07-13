import axios from 'axios';
import { store } from '../Reducer';
import { callSuccess } from '../Reducer/Error';
import { setReload } from '../Reducer/Stater';
import getErrorAxios from '../utils/getErrorAxios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
import { setData } from '../Reducer/Model';

export default async function boxArhive(box: number): Promise<null> {
  const ChangerMode = store.getState().Stater.MailType;
  const ArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[ChangerMode][ArhiveType];
  try {
    const response = await axios.post<null>(`${server()}/arhive/box`, {
      ...getToken(),
      select: state.selectionModel,
      ArhiveType,
      box,
    });
    store.dispatch(callSuccess('Операция успешно выплнено'));
    store.dispatch(setData([ChangerMode, ArhiveType, 'selectionModel', []]));
    store.dispatch(setReload(true));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
