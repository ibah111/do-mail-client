import { ClassConstructor } from 'class-transformer';
import {
  ArhiveType,
  DataIncomingType,
  IncomingCourtBailiffMailState,
  IncomingCourtMailState,
  IncomingCreditAgreementProcessing,
  IncomingGovernmentMailState,
  IncomingMailState,
  MailType,
} from '../../../Types/dataIncoming';
type TransformationState = {
  [index in MailType]: {
    [key in ArhiveType]: ClassConstructor<DataIncomingType[index][key]>;
  };
};
function ArhiveTransform<T>(data: ClassConstructor<T>) {
  return {
    [ArhiveType.NO]: data,
    [ArhiveType.ARHIVE]: data,
    [ArhiveType.ARHIVE_LAW_EXEC]: data,
  };
}
export const allTransformations: TransformationState = {
  [MailType.INCOMING_MAIL]: ArhiveTransform(IncomingMailState),
  [MailType.INCOMING_GOVERNMENT_MAIL]: ArhiveTransform(
    IncomingGovernmentMailState,
  ),
  [MailType.INCOMING_COURT_MAIL]: ArhiveTransform(IncomingCourtMailState),
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: ArhiveTransform(
    IncomingCourtBailiffMailState,
  ),
  [MailType.INCOMING_COURT_BAILIFF_MAIL2]: ArhiveTransform(
    IncomingCourtBailiffMailState,
  ),
  [MailType.INCOMING_CREDIT_AGREEMENT_PROCESSING]: ArhiveTransform(
    IncomingCreditAgreementProcessing,
  ),
};
export default function getTransformations<
  T extends MailType,
  K extends ArhiveType,
>(typ: T, arhive: K) {
  return allTransformations[typ][arhive];
}
