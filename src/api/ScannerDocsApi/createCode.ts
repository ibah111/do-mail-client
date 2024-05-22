import axios from 'axios';
import server from '../../utils/server';
import { enqueueSnackbar } from 'notistack';
import requests from '../../utils/requests';

class ScannerBodyRequest {
  title: string;
  contact_doc_id: number;
  mail_id: number;
  doc_type: number;
  law_act_id: number;
}
export default async function createCode(
  params: ScannerBodyRequest,
  doc_id: number,
) {
  return requests
    .post('/123' + '/scanner', {
      ...params,
      doc_id,
    })
    .then((res) => {
      console.log('result', res);
    })
    .catch((err) => {
      console.log(err);
    });
}
