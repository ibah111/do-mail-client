import requests from '../utils/requests';
export default async function addUser(login: string) {
  const Action = await requests.post<boolean>('/role/add_user', {
    login,
  });
  return Action.data;
}
