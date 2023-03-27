import requests from '../utils/requests';
import { User } from './getRole';

export default async function searchUser(value: string): Promise<User[]> {
  const res = await requests.get<User[]>(`/users/${value}`);
  return res.data;
}
