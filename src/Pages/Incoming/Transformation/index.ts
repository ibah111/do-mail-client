import { ClassConstructor } from 'class-transformer';
import {
  ArhiveIncomingCourtBailiffMailState,
  ArhiveIncomingCourtMailState,
  ArhiveIncomingGovernmentMailState,
  ArhiveIncomingMailState,
  ArhiveType,
  DataIncomingType,
  IncomingCourtBailiffMailState,
  IncomingCourtMailState,
  IncomingGovernmentMailState,
  IncomingMailState,
  MailType,
} from '../../../Types/dataIncoming';
type TransformationState = {
  [index in MailType]: {
    [key in ArhiveType]: ClassConstructor<DataIncomingType[index][key]>;
  };
};
export const allTransformations: TransformationState = {
  IncomingMail: {
    [ArhiveType.NO]: IncomingMailState,
    [ArhiveType.ARHIVE]: ArhiveIncomingMailState,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingMailState,
  },
  IncomingGovernmentMail: {
    [ArhiveType.NO]: IncomingGovernmentMailState,
    [ArhiveType.ARHIVE]: ArhiveIncomingGovernmentMailState,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingGovernmentMailState,
  },
  IncomingCourtMail: {
    [ArhiveType.NO]: IncomingCourtMailState,
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtMailState,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtMailState,
  },
  IncomingCourtBailiffMail: {
    [ArhiveType.NO]: IncomingCourtBailiffMailState,
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtBailiffMailState,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtBailiffMailState,
  },
};
export default function getColumns<T extends MailType, K extends ArhiveType>(
  typ: T,
  arhive: K,
) {
  return allTransformations[typ][arhive];
}
