import axios from 'axios';
import { store } from '../Reducer';
import { callError, callSuccess, callWarning } from '../Reducer/Message';
import getErrorAxios from '../utils/getErrorAxios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
import { setData } from '../Reducer/Model';
import { ArhiveType } from '../Types/dataIncoming';

export default async function addArhive(
  ArhiveType: ArhiveType,
): Promise<{ success: number }> {
  const MailType = store.getState().Stater.MailType;
  const currentArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[MailType][currentArhiveType];
  try {
    const response = await axios.post<{ success: number }>(
      `${server()}/arhive/add`,
      {
        ...getToken(),
        select: state.selectionModel,
        ArhiveType,
      },
    );
    const result = response.data;
    if (result) {
      if (state.selectionModel.length === result.success)
        store.dispatch(callSuccess('Операция успешно выполнена'));
      if (result.success === 0) {
        store.dispatch(callError('Эти строчки уже существуют в архиве'));
      }
      if (0 < result.success && result.success < state.selectionModel.length) {
        store.dispatch(callWarning('Операция выполнена с предупреждениями'));
      }
    } else {
      store.dispatch(callError('Во время выполнения произошла ошибка'));
    }
    store.dispatch(
      setData([MailType, currentArhiveType, 'selectionModel', []]),
    );
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
