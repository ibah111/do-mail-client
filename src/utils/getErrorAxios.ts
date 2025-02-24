import axios from 'axios';
import { store } from '../Reducer';
import { callError } from '../Reducer/Message';

export default function getErrorAxios(e: unknown) {
  if (axios.isAxiosError(e)) {
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
