import { GridColumns } from "@mui/x-data-grid-premium";
import IncomingGovernmentMailColumns from "./IncomingGovernmentMail";
import IncomingMailColumns from "./IncomingMail";
interface ColumnsState {
  [index: string]: GridColumns;
}
const Columns: ColumnsState = {
  IncomingMail: IncomingMailColumns,
  IncomingGovernmentMail: IncomingGovernmentMailColumns,
};
export default Columns;
