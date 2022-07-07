import { DataGridPremium } from "@mui/x-data-grid-premium";
import { useAppSelector } from "../../Reducer";
import IncomingMailColumns from "./Columns/IncomingMail";

export default function DataGrid() {
  const rows = useAppSelector((state) => state.DataIncoming.IncomingMail);
  return (
    <>
      <DataGridPremium autoHeight columns={IncomingMailColumns} rows={rows} />
    </>
  );
}
