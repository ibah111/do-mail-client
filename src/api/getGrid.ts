import { store } from '../Reducer';
import { ArhiveType, DataIncomingState, MailType } from '../Types/dataIncoming';
import getErrorAxios from '../utils/getErrorAxios';
import requests from '../utils/requests';

export default async function getGrid<
  T extends MailType,
  K extends ArhiveType,
>(): Promise<DataIncomingState[T][K]> {
  const MailType = store.getState().Stater.MailType;
  const ArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[MailType][ArhiveType];
  try {
    const response = await requests.post<DataIncomingState[T][K]>('/data', {
      ...state,
      MailType,
      ArhiveType,
    });
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
