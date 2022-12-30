import { AbilityBuilder, createMongoAbility, PureAbility } from '@casl/ability';
import { AuthUserSuccess } from '../Schemas/Auth';
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Permit = 'permit',
  Arhive = 'Arhive',
  Delete = 'delete',
}
export enum Subject {
  Main = 'Main',
  Role = 'Role',
  DataIncoming = 'DataIncoming',
}
type Subjects = Subject | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;
export function createForUser(user?: AuthUserSuccess) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility,
  );
  if (user) {
    const roles = user.roles;
    if (roles.includes('admin')) {
      can(Action.Manage, 'all');
    }
    if (roles.includes('deleter')) {
      can(Action.Delete, Subject.DataIncoming);
    }
    can(Action.Read, Subject.Main);
  }
  return build();
}
