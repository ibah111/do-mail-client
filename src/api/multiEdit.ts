import { IncomingMailState } from '../Types/dataIncoming';
import getErrorAxios from '../utils/getErrorAxios';
import requests from '../utils/requests';

export class MultiInputEdit {
  ids: number[];
  key: keyof IncomingMailState;
  value: any;
}

export default async function multiEdit(data: MultiInputEdit) {
  const url = '/Edit/MultiEditIncoming';
  try {
    return await requests
      .post(url, {
        ...data,
      })
      .then((res) => res);
  } catch (error) {
    throw getErrorAxios(error);
  }
}
