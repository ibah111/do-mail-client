import { ClassConstructor } from 'class-transformer';
import {
  ArhiveIncomingCourtBailiffMailState,
  ArhiveIncomingCourtMailState,
  ArhiveIncomingGovernmentMailState,
  ArhiveIncomingMailState,
  ArhiveType,
  DataIncomingState,
  IncomingCourtBailiffMailState,
  IncomingCourtMailState,
  IncomingGovernmentMailState,
  IncomingMailState,
} from '../../../Types/dataIncoming';
type TransformationState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: ClassConstructor<any>;
};
export const allTransformations: TransformationState = {
  IncomingMail: IncomingMailState,
  IncomingGovernmentMail: IncomingGovernmentMailState,
  IncomingCourtMail: IncomingCourtMailState,
  IncomingCourtBailiffMail: IncomingCourtBailiffMailState,
  ArhiveIncomingMail: ArhiveIncomingMailState,
  ArhiveIncomingGovernmentMail: ArhiveIncomingGovernmentMailState,
  ArhiveIncomingCourtMail: ArhiveIncomingCourtMailState,
  ArhiveIncomingCourtBailiffMail: ArhiveIncomingCourtBailiffMailState,
};
export default function getColumns<T extends keyof DataIncomingState>(
  typ: T,
  arhive: ArhiveType,
) {
  return allTransformations[`${arhive > 0 ? 'Arhive' : ''}${typ}`];
}
