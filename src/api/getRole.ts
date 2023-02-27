import requests from '../utils/requests';
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
  const Rights = await requests.post<ResultRole>('/role/get');
  return Rights.data;
}
