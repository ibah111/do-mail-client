import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function removeRole(id: number) {
  const Action = await axios.post<boolean>(server() + '/role/remove_role', {
    ...getToken(),
    id,
  });
  return Action.data;
}
