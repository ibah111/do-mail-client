import { store } from '../Reducer';
import { callSuccess } from '../Reducer/Message';
import getErrorAxios from '../utils/getErrorAxios';
import requests from '../utils/requests';

export default async function removeFunction(value: number[]): Promise<null> {
  try {
    const response = await requests.post<null>(`/Delete`, {
      select: value,
    });
    store.dispatch(callSuccess('Операция успешно выплнено'));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
