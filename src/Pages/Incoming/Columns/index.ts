import { GridColumns } from '@mui/x-data-grid-premium';
import getAllow, { AllowFunction } from '../../../hooks/getAllow';
import {
  ArhiveType,
  DataIncomingType,
  MailType,
} from '../../../Types/dataIncoming';
import ArhiveIncomingCourtBailiffMailColumns from './ArhiveIncomingCourtBailiffMail';
import ArhiveIncomingCourtBailiffMailColumns2 from './ArhiveIncomingCourtBailiffMail2';
import ArhiveIncomingCourtMailColumns from './ArhiveIncomingCourtMail';
import ArhiveIncomingGovernmentMailColumns from './ArhiveIncomingGovernmentMail';
import ArhiveIncomingMailColumns from './ArhiveIncomingMail';
import IncomingCourtBailiffMailColumns from './IncomingCourtBailiffMail';
import IncomingCourtBailiffMailColumns2 from './IncomingCourtBailiffMail2';
import IncomingCourtMailColumns from './IncomingCourtMail';
import IncomingGovernmentMailColumns from './IncomingGovernmentMail';
import IncomingMailColumns from './IncomingMail';
type GridColumnMail<T extends MailType, K extends ArhiveType> = GridColumns<
  DataIncomingType[T][K]
>;
type ColumnFunction<T extends MailType, K extends ArhiveType> = (
  isAllow: AllowFunction,
) => GridColumnMail<T, K>;
type ColumnsArhiveState<T extends MailType> = {
  [index in ArhiveType]: ColumnFunction<T, index>;
};
type ColumnsMailState = {
  [index in MailType]: ColumnsArhiveState<index>;
};
export const allColumns: ColumnsMailState = {
  [MailType.INCOMING_MAIL]: {
    [ArhiveType.NO]: IncomingMailColumns,
    [ArhiveType.ARHIVE]: ArhiveIncomingMailColumns,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingMailColumns,
  },
  [MailType.INCOMING_GOVERNMENT_MAIL]: {
    [ArhiveType.NO]: IncomingGovernmentMailColumns,
    [ArhiveType.ARHIVE]: ArhiveIncomingGovernmentMailColumns,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingGovernmentMailColumns,
  },
  [MailType.INCOMING_COURT_MAIL]: {
    [ArhiveType.NO]: IncomingCourtMailColumns,
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtMailColumns,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtMailColumns,
  },
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: {
    [ArhiveType.NO]: IncomingCourtBailiffMailColumns,
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtBailiffMailColumns,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtBailiffMailColumns,
  },
  [MailType.INCOMING_COURT_BAILIFF_MAIL2]: {
    [ArhiveType.NO]: IncomingCourtBailiffMailColumns2,
    [ArhiveType.ARHIVE]: ArhiveIncomingCourtBailiffMailColumns2,
    [ArhiveType.ARHIVE_LAW_EXEC]: ArhiveIncomingCourtBailiffMailColumns2,
  },
};
export default function getColumns<T extends MailType, K extends ArhiveType>(
  typ: T,
  arhive: K,
): GridColumnMail<T, K> {
  return allColumns[typ][arhive](getAllow()) as GridColumnMail<T, K>;
}
