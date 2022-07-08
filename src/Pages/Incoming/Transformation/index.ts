import { ClassConstructor } from "class-transformer";
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
  [index in keyof DataIncomingState]: ClassConstructor<any>;
};
const Transformation: TransformationState = {
  IncomingMail: IncomingMailState,
  IncomingGovernmentMail: IncomingGovernmentMailState,
  IncomingCourtMail: IncomingCourtMailState,
  IncomingCourtBailiffMail: IncomingCourtBailiffMailState,
  ArhiveIncomingMail: ArhiveIncomingMailState,
  ArhiveIncomingGovernmentMail: ArhiveIncomingGovernmentMailState,
  ArhiveIncomingCourtMail: ArhiveIncomingCourtMailState,
  ArhiveIncomingCourtBailiffMail: ArhiveIncomingCourtBailiffMailState,
};
export default Transformation;
