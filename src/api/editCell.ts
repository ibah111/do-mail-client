import moment from 'moment';
import { store } from '../Reducer';
import { callSuccess } from '../Reducer/Message';
import getErrorAxios from '../utils/getErrorAxios';
import requests from '../utils/requests';

export default async function editCell(
  id: number,
  name: string,
  data: unknown,
  pres?: string,
): Promise<boolean> {
  let value = String(data);
  if (data instanceof Date) {
    value = moment(data)
      .add(-1 * data.getTimezoneOffset(), 'minutes')
      .toISOString();
  }
  const MailType = store.getState().Stater.MailType;
  const ArhiveType = store.getState().Stater.ArhiveType;
  try {
    const response = await requests.post<boolean>('/edit', {
      id,
      name: pres ? pres + name : name,
      value,
      MailType,
      ArhiveType,
    });
    if (response.data === true)
      store.dispatch(callSuccess('Операция выполнена успешно'));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
