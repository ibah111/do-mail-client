import { enqueueSnackbar } from 'notistack';
import requests from '../utils/requests';

interface UpdateDocTypeParams {
  incoming_id: number;
  doc_type: number;
}

export default async function UpdateDocType({
  ...params
}: UpdateDocTypeParams) {
  return await requests
    .post('/123' + '/updateDocType', { ...params })
    .catch((err) => {
      enqueueSnackbar('Произошла ошибка', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      console.log(err);
    })
    .finally(() =>
      enqueueSnackbar('Тип обновлён успешно', {
        variant: 'success',
        autoHideDuration: 5000,
      }),
    );
}
