import axios from 'axios';
import { store } from '../Reducer';
import { ArhiveType, DataIncomingState, MailType } from '../Types/dataIncoming';
import getErrorAxios from '../utils/getErrorAxios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export default async function getGrid<
  T extends MailType,
  K extends ArhiveType,
>(): Promise<DataIncomingState[T][K]> {
  const MailType = store.getState().Stater.MailType;
  const ArhiveType = store.getState().Stater.ArhiveType;
  const state = store.getState().Model[MailType][ArhiveType];
  try {
    const response = await axios.post<DataIncomingState[T][K]>(
      `${server()}/data`,
      {
        ...getToken(),
        ...state,
        MailType,
        ArhiveType,
      },
    );
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
