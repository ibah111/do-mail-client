import { AbilityBuilder } from '@casl/ability';
import { ArhiveType, MailType } from '../Types/dataIncoming';
import { Action, AppAbility, Subject } from './casl.factory';

export default function AllRights(
  can: AbilityBuilder<AppAbility>['can'],
  cannot: AbilityBuilder<AppAbility>['cannot'],
) {
  can(Action.Read, Subject.DataIncoming, {
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
