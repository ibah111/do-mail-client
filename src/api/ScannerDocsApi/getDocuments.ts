import { forkJoin, lastValueFrom, of, Observable } from 'rxjs';
import { authRetry, post, transformAxios } from '@tools/rxjs-pipes';
import axios, { AxiosRequestConfig } from 'axios';
import { authorize } from '../getToken';

export const baseRequestInstance = axios.create({
  baseURL: 'https://apps.usb.ru:3003',
});
export const baseRequest = of(baseRequestInstance);

const url = of('/documents');
const options: Observable<AxiosRequestConfig> = of({
  responseType: 'blob',
  headers: {
    token: await authorize(),
  },
});
export default async function getDocuments(id: number) {
  return lastValueFrom(
    forkJoin([
      baseRequest,
      url,
      of({
        id,
      }),
      options,
    ]).pipe(post<Blob>(), transformAxios(), authRetry()),
  );
}
