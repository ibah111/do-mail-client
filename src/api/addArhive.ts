import axios from 'axios';
import { store } from '../Reducer';
import { callSuccess } from '../Reducer/Error';
import getErrorAxios from '../utils/getErrorAxios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
import { setData } from '../Reducer/Model';
import { ArhiveType } from '../Types/dataIncoming';

export default async function addArhive(ArhiveType: ArhiveType): Promise<null> {
  const MailType = store.getState().Stater.MailType;
  const currentArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[MailType][currentArhiveType];
  try {
    const response = await axios.post<null>(`${server()}/arhive/add`, {
      ...getToken(),
      select: state.selectionModel,
      ArhiveType,
    });
    store.dispatch(callSuccess('Операция успешно выплнено'));
    store.dispatch(
      setData([MailType, currentArhiveType, 'selectionModel', []]),
    );
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
