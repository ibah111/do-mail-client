import requests from '../utils/requests';

interface UpdateDocTypeParams {
  incoming_id: number;
  doc_type: number;
}

export default async function UpdateDocType({
  ...params
}: UpdateDocTypeParams) {
  return await requests.post('/123' + '/updateDocType', { ...params });
}
