import requests from '../utils/requests';
export default async function removeUser(id: number) {
  const Action = await requests.post<boolean>('/role/remove_user', {
    id,
  });
  return Action.data;
}
