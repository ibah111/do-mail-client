import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export default async function addUser(login: string) {
  const Action = await axios.post<boolean>(server() + '/role/add_user', {
    ...getToken(),
    login,
  });
  return Action.data;
}
