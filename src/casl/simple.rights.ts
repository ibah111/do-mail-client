import { AbilityBuilder } from '@casl/ability';
import { ArhiveType, MailType } from '../Types/dataIncoming';
import { Action, AppAbility, Subject } from './casl.factory';

export default function SimpleRights(
  can: AbilityBuilder<AppAbility>['can'],
  cannot: AbilityBuilder<AppAbility>['cannot'],
) {
  can(Action.Read, Subject.DataIncoming);
  can(Action.Read, Subject.Main);
  cannot(
    [Action.Read, Action.Create, Action.Delete, Action.Permit],
    Subject.DataIncoming,
    {
      arhive: { $in: [ArhiveType.ARHIVE, ArhiveType.ARHIVE_LAW_EXEC] },
    },
  );
  cannot(
    [Action.Read, Action.Create, Action.Delete, Action.Permit],
    Subject.DataIncoming,
    {
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
