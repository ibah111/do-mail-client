import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function addRole(user_id: number, role_id: number) {
  const Action = await axios.post<boolean>(server() + '/role/add_role', {
    ...getToken(),
    user_id,
    role_id,
  });
  return Action.data;
}
