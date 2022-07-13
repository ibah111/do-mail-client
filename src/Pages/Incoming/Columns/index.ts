import { GridColumns } from '@mui/x-data-grid-premium';
import getAllow, { AllowFunction } from '../../../hooks/getAllow';
import {
  ArhiveType,
  DataIncomingState,
  MailType,
} from '../../../Types/dataIncoming';
import ArhiveIncomingCourtBailiffMailColumns from './ArhiveIncomingCourtBailiffMail';
import ArhiveIncomingCourtMailColumns from './ArhiveIncomingCourtMail';
import ArhiveIncomingGovernmentMailColumns from './ArhiveIncomingGovernmentMail';
import ArhiveIncomingMailColumns from './ArhiveIncomingMail';
import IncomingCourtBailiffMailColumns from './IncomingCourtBailiffMail';
import IncomingCourtMailColumns from './IncomingCourtMail';
import IncomingGovernmentMailColumns from './IncomingGovernmentMail';
import IncomingMailColumns from './IncomingMail';
type ColumnsState = {
  [index: string]: (isAllow: AllowFunction) => GridColumns;
};
export const allColumns: ColumnsState = {
  IncomingMail: IncomingMailColumns,
  IncomingGovernmentMail: IncomingGovernmentMailColumns,
  IncomingCourtMail: IncomingCourtMailColumns,
  IncomingCourtBailiffMail: IncomingCourtBailiffMailColumns,
  ArhiveIncomingMail: ArhiveIncomingMailColumns,
  ArhiveIncomingGovernmentMail: ArhiveIncomingGovernmentMailColumns,
  ArhiveIncomingCourtMail: ArhiveIncomingCourtMailColumns,
  ArhiveIncomingCourtBailiffMail: ArhiveIncomingCourtBailiffMailColumns,
};
export default function getColumns<T extends MailType, K extends ArhiveType>(
  typ: T,
  arhive: K,
) {
  return allColumns[`${arhive > 0 ? 'Arhive' : ''}${typ}`](getAllow());
}
