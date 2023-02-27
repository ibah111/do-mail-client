import { store } from '../Reducer';
import { callSuccess } from '../Reducer/Message';
import { setReload } from '../Reducer/Stater';
import getErrorAxios from '../utils/getErrorAxios';
import { setData } from '../Reducer/Model';
import requests from '../utils/requests';

export default async function boxArhive(box: number): Promise<null> {
  const MailType = store.getState().Stater.MailType;
  const ArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[MailType][ArhiveType];
  try {
    const response = await requests.post<null>('/arhive/box', {
      select: state.selectionModel,
      ArhiveType,
      box,
    });
    store.dispatch(callSuccess('Операция успешно выплнено'));
    store.dispatch(setData([MailType, ArhiveType, 'selectionModel', []]));
    store.dispatch(setReload(true));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
