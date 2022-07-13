import axios from 'axios';
import moment from 'moment';
import { store } from '../Reducer';
import getErrorAxios from '../utils/getErrorAxios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export default async function editCell(
  id: number,
  name: string,
  data: unknown,
): Promise<null> {
  let value = String(data);
  if (data instanceof Date) {
    value = moment(data).toISOString();
  }
  const ChangerMode = store.getState().Stater.MailType;
  const ArhiveType = store.getState().Stater.ArhiveType;
  try {
    const response = await axios.post<null>(`${server()}/edit`, {
      ...getToken(),
      id,
      name,
      value,
      ChangerMode,
      ArhiveType,
    });
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
