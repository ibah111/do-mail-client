import { store } from '../Reducer';
export type AllowFunction = (...userRoles: string[]) => boolean;
const getAllow = (): AllowFunction => {
  const roles = store.getState().User.roles;
  console.log(roles);
  return (...userRoles: string[]) => {
    let result = 0;
    for (const role of userRoles) {
      if (roles.includes(role)) result += 1;
    }
    return result > 0;
  };
};
export default getAllow;
