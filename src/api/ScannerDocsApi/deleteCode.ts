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

  try {
    return await requests.delete(url, {
      data: {
        incoming_id,
        barcode,
      },
    });
  } catch (error) {
    const error_message = error as string;
    enqueueSnackbar(error_message, {
      variant: 'error',
    });
  }
}
