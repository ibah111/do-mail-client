import axios from 'axios';
import server from '../../utils/server';
import { enqueueSnackbar } from 'notistack';
import requests from '../../utils/requests';

class deleteCodeInput {
  incoming_id: number;
  barcode: string;
}
export default async function deleteCode({
  incoming_id,
  barcode,
}: deleteCodeInput) {
  const url = '/123/deleteBarcode';
  return await requests.delete(url, {
    data: {
      incoming_id,
      barcode,
    },
  });
}
