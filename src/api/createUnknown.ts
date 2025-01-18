import { enqueueSnackbar } from 'notistack';
import getErrorAxios from '../utils/getErrorAxios';
import requests from '../utils/requests';

interface createUnknownInput {
  date: Date;
  count: number;
}

export default async function createUnknown(body: createUnknownInput) {
  try {
    const response = await requests.post('', { ...body });
    if (response.data === true) {
      enqueueSnackbar(`Успешно создано ${body.count} неопознанных документов.`);
    }
  } catch (error) {
    console.log(error);
    throw getErrorAxios(error);
  }
}
