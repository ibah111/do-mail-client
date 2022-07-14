import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function removeUser(id: number) {
  const Action = await axios.post<boolean>(server() + '/role/remove_user', {
    ...getToken(),
    id,
  });
  return Action.data;
}
