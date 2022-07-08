import { GridColumns } from "@mui/x-data-grid-premium";
import { DataIncomingState } from "../../../Types/dataIncoming";
import ArhiveIncomingCourtBailiffMailColumns from "./ArhiveIncomingCourtBailiffMail";
import ArhiveIncomingCourtMailColumns from "./ArhiveIncomingCourtMail";
import ArhiveIncomingGovernmentMailColumns from "./ArhiveIncomingGovernmentMail";
import ArhiveIncomingMailColumns from "./ArhiveIncomingMail";
import IncomingCourtBailiffMailColumns from "./IncomingCourtBailiffMail";
import IncomingCourtMailColumns from "./IncomingCourtMail";
import IncomingGovernmentMailColumns from "./IncomingGovernmentMail";
import IncomingMailColumns from "./IncomingMail";
type ColumnsState = {
  [index in keyof DataIncomingState]: GridColumns<any>;
};
const Columns: ColumnsState = {
  IncomingMail: IncomingMailColumns,
  IncomingGovernmentMail: IncomingGovernmentMailColumns,
  IncomingCourtMail: IncomingCourtMailColumns,
  IncomingCourtBailiffMail: IncomingCourtBailiffMailColumns,
  ArhiveIncomingMail: ArhiveIncomingMailColumns,
  ArhiveIncomingGovernmentMail: ArhiveIncomingGovernmentMailColumns,
  ArhiveIncomingCourtMail: ArhiveIncomingCourtMailColumns,
  ArhiveIncomingCourtBailiffMail: ArhiveIncomingCourtBailiffMailColumns,
};
export default Columns;
