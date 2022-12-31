import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { AuthUserSuccess } from '../Schemas/Auth';
import { ArhiveType } from '../Types/dataIncoming';
import { IDataIncoming } from './casl.types';
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
type Subjects = Subject | InferSubjects<IDataIncoming> | 'all';
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
      arhive: { $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC] },
    });
    if (roles.includes('deleter')) {
      can(Action.Delete, Subject.DataIncoming);
      cannot(Action.Delete, Subject.DataIncoming, {
        arhive: { $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC] },
      });
    }
    if (roles.includes('arhive')) {
      can(Action.Read, Subject.DataIncoming, {
        arhive: {
          $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
        },
      });
      can(Action.Delete, Subject.DataIncoming, {
        arhive: {
          $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
        },
      });
      can(Action.Create, Subject.DataIncoming, {
        arhive: {
          $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
        },
      });
      can(Action.Permit, Subject.DataIncoming, {
        arhive: {
          $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
        },
      });
    }
    if (roles.includes('admin')) {
      //can(Action.Manage, 'all');
    }
  }
  return build();
}
