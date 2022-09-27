import axios from 'axios';
import { store } from '../Reducer';
import { callSuccess } from '../Reducer/Message';
import { setReload } from '../Reducer/Stater';
import getErrorAxios from '../utils/getErrorAxios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
import { setData } from '../Reducer/Model';

export default async function removeFunction(value: number[]): Promise<null> {
  try {
    const response = await axios.post<null>(`${server()}/Delete`, {
      ...getToken(),
      select: value,
    });
    store.dispatch(callSuccess('Операция успешно выплнено'));
    return response.data;
  } catch (e) {
    throw getErrorAxios(e);
  }
}
