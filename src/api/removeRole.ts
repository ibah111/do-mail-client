import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function removeRole(user_id: number, role_id: number) {
  const Action = await axios.post<boolean>(server() + '/role/remove_role', {
    ...getToken(),
    user_id,
    role_id,
  });
  return Action.data;
}
