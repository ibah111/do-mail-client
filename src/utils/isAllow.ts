import { store } from "../Reducer";

export const isAllow = () => {
  const roles = store.getState().User.roles;
  return (...userRoles: string[]) => {
    let result = 0;
    for (const role of userRoles) {
      roles.includes(role);
      result += 1;
    }
    return result > 0;
  };
};
