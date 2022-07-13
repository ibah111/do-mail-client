import { AxiosError } from 'axios';
import { store } from '../Reducer';
import { callError } from '../Reducer/Error';

export default function getErrorAxios(e: unknown) {
  if (e instanceof AxiosError) {
    switch (e.response?.status) {
      case 403:
        store.dispatch(
          callError('Произошла ошибка доступа: ' + e.response.data.message),
        );
        break;
      default:
        store.dispatch(callError('Произошла непредвиденная ошибка'));
        break;
    }
  }
  return e;
}
