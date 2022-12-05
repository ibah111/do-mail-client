import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export interface Role {
  id: number;
  name: string;
  title: string;
  Users: User[];
}
export interface User {
  id: number;
  id_bitrix: number;
  login: string;
  Roles: Role[];
}
export interface ResultRole {
  roles: Role[];
  users: User[];
}
export default async function getRole() {
  const Rights = await axios.post<ResultRole>(
    server() + '/role/get',
    getToken(),
  );
  return Rights.data;
}
