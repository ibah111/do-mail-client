import { ClassConstructor } from "class-transformer";
import { ArhiveState } from "../../../Reducer/Stater";
import {
  ArhiveIncomingCourtBailiffMailState,
  ArhiveIncomingCourtMailState,
  ArhiveIncomingGovernmentMailState,
  ArhiveIncomingMailState,
  DataIncomingState,
  IncomingCourtBailiffMailState,
  IncomingCourtMailState,
  IncomingGovernmentMailState,
  IncomingMailState,
} from "../../../Types/dataIncoming";
type TransformationState = {
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
  arhive: ArhiveState
) {
  return allTransformations[`${arhive > 0 ? "Arhive" : ""}${typ}`];
}
