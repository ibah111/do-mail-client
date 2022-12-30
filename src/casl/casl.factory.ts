import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { AuthUserSuccess } from '../Schemas/Auth';
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Permit = 'permit',
  Delete = 'delete',
}
export enum Subject {
  Main = 'Main',
  Role = 'Role',
  DataIncoming = 'DataIncoming',
  IncomingMail = 'IncomingMail',
  IncomingGovernmentMail = 'IncomingGovernmentMail',
  IncomingCourtMail = 'IncomingCourtMail',
  IncomingCourtBailiffMail = 'IncomingCourtBailiffMail',
}
type Subjects = Subject | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;
export function createForUser(user?: AuthUserSuccess) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility,
  );
  if (user) {
    const roles = user.roles;
    can(Action.Read, Subject.DataIncoming);
    can(Action.Read, Subject.Main);
    cannot(Action.Read, Subject.DataIncoming, {
      arhive: true,
    });
    cannot(Action.Read, Subject.DataIncoming, {
      arhive_id: true,
    });
    if (roles.includes('deleter')) {
      can(Action.Delete, Subject.DataIncoming);
      cannot(Action.Delete, Subject.DataIncoming, {
        arhive: true,
      });
      cannot(Action.Delete, Subject.DataIncoming, {
        arhive_id: true,
      });
    }
    if (roles.includes('arhive')) {
      can(Action.Read, Subject.DataIncoming, { arhive: true });
      //can(Action.Read, Subject.DataIncoming, { arhive_id: true });
    }
    if (roles.includes('admin')) {
      //can(Action.Manage, 'all');
    }
  }
  return build();
}
