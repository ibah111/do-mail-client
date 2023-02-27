import requests from '../utils/requests';
import server from '../utils/server';

export interface User {
  position: string;
  total_sum: number;
  work: string;
  firstName: string;
  id: number;
}
export const getUsers = async () => {
  const Users = await requests.post<User[]>(server() + '/rating/users');
  return Users.data;
};
