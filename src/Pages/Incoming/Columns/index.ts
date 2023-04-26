import { GridColDef } from '@mui/x-data-grid-premium';
import getAllow, { AllowFunction } from '../../../hooks/getAllow';
import {
  ArhiveType,
  DataIncomingType,
  MailType,
} from '../../../Types/dataIncoming';
import IncomingCourtBailiffMailColumns from './IncomingCourtBailiffMail';
import IncomingCourtBailiffMailColumns2 from './IncomingCourtBailiffMail2';
import IncomingCourtMailColumns from './IncomingCourtMail';
import IncomingGovernmentMailColumns from './IncomingGovernmentMail';
import IncomingMailColumns from './IncomingMail';
type GridColumnMail<T extends MailType, K extends ArhiveType> = GridColDef<
  DataIncomingType[T][K]
>[];
type ColumnFunction<T extends MailType, K extends ArhiveType> = (
  isAllow: AllowFunction,
  arhive: K,
) => GridColumnMail<T, K>;
type ColumnsMailState = {
  [index in MailType]: ColumnFunction<index, ArhiveType>;
};
export const allColumns: ColumnsMailState = {
  [MailType.INCOMING_MAIL]: IncomingMailColumns,
  [MailType.INCOMING_GOVERNMENT_MAIL]: IncomingGovernmentMailColumns,
  [MailType.INCOMING_COURT_MAIL]: IncomingCourtMailColumns,
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: IncomingCourtBailiffMailColumns,
  [MailType.INCOMING_COURT_BAILIFF_MAIL2]: IncomingCourtBailiffMailColumns2,
};
export default function getColumns<T extends MailType, K extends ArhiveType>(
  typ: T,
  arhive: K,
): GridColumnMail<T, K> {
  return allColumns[typ](getAllow(), arhive) as GridColumnMail<T, K>;
}
