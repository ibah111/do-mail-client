import { GridColumns } from "@mui/x-data-grid-premium";
import { DataIncomingState } from "../../../Types/dataIncoming";
import ArhiveIncomingCourtBailiffColumns from "./ArhiveIncomingCourtBailiff";
import ArhiveIncomingCourtMailColumns from "./ArhiveIncomingCourtMail";
import ArhiveIncomingGovernmentMailColumns from "./ArhiveIncomingGovernmentMail";
import ArhiveIncomingMailColumns from "./ArhiveIncomingMail";
import IncomingCourtBailiffColumns from "./IncomingCourtBailiff";
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
  IncomingCourtBailiff: IncomingCourtBailiffColumns,
  ArhiveIncomingMail: ArhiveIncomingMailColumns,
  ArhiveIncomingGovernmentMail: ArhiveIncomingGovernmentMailColumns,
  ArhiveIncomingCourtMail: ArhiveIncomingCourtMailColumns,
  ArhiveIncomingCourtBailiff: ArhiveIncomingCourtBailiffColumns,
};
export default Columns;
