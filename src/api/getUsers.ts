import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';

export interface User {
  position: string;
  total_sum: number;
  work: string;
  firstName: string;
  id: number;
}
export const getUsers = async () => {
  const Users = await axios.post<User[]>(
    server() + '/rating/users',
    getToken(),
  );
  return Users.data;
};
