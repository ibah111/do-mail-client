import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { AuthUserSuccess } from '../Schemas/Auth';
import { ArhiveType, MailType } from '../Types/dataIncoming';
import { IDataIncoming } from './casl.types';
import SimpleRights from './simple.rights';
import AllRights from './all.rights';
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
}
type Subjects = Subject | InferSubjects<IDataIncoming> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;
export function createForUser(user?: AuthUserSuccess) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility,
  );
  if (user) {
    const roles = user.roles;
    SimpleRights(can, cannot);
    if (roles.includes('deleter')) {
      can(Action.Delete, Subject.DataIncoming, {
        arhive: { $nin: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC] },
        mode: {
          $in: [
            MailType.INCOMING_MAIL,
            MailType.INCOMING_GOVERNMENT_MAIL,
            MailType.INCOMING_COURT_MAIL,
            MailType.INCOMING_COURT_BAILIFF_MAIL,
          ],
        },
      });
    }
    if (roles.includes('arhive')) {
      can(
        [Action.Read, Action.Delete, Action.Create, Action.Permit],
        Subject.DataIncoming,
        {
          arhive: {
            $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC],
          },
          mode: {
            $in: [
              MailType.INCOMING_MAIL,
              MailType.INCOMING_GOVERNMENT_MAIL,
              MailType.INCOMING_COURT_MAIL,
              MailType.INCOMING_COURT_BAILIFF_MAIL,
            ],
          },
        },
      );
    }
    AllRights(can, cannot);
    if (roles.includes('admin')) {
      can(Action.Manage, 'all');
    }
  }
  return build();
}
