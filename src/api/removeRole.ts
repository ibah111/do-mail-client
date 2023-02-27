import requests from '../utils/requests';
export default async function removeRole(user_id: number, role_id: number) {
  const Action = await requests.post<boolean>('/role/remove_role', {
    user_id,
    role_id,
  });
  return Action.data;
}
