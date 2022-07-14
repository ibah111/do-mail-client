import axios from 'axios';
import { getToken } from '../utils/getToken';
import server from '../utils/server';
export interface Role {
  id: number;
  name: string;
  title: string;
  Users_Roles: User_Role[];
}
interface User_Role {
  id: number;
  user_id: number;
  User: User;
  role_id: number;
  Role: Role;
}
export interface User {
  id: number;
  id_bitrix: number;
  login: string;
  Users_Roles: User_Role[];
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
