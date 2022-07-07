import { DataGridPremium } from "@mui/x-data-grid-premium";
import { plainToInstance } from "class-transformer";
import { typData } from ".";
import useGrid from "../../Hooks/useGrid";
import { useAppSelector } from "../../Reducer";
import { startModelState } from "../../Reducer/Model";
import { IncomingMailState } from "../../Types/dataIncoming";
import IncomingMailColumns from "./Columns/IncomingMail";

export default function DataGrid() {
  const { data, state, setPage, setPageSize, setFilterModel } =
    useGrid(typData);
  return (
    <>
      <DataGridPremium
        autoHeight
        columns={IncomingMailColumns}
        rowCount={data.count}
        pagination
        paginationMode="server"
        pageSize={state.pageSize}
        onPageSizeChange={setPageSize}
        filterModel={state.filterModel}
        onFilterModelChange={setFilterModel}
        onPageChange={setPage}
        filterMode="server"
        rows={plainToInstance(IncomingMailState, data.rows)}
      />
    </>
  );
}
