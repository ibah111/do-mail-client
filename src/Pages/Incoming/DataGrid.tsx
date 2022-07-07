import { DataGridPremium } from "@mui/x-data-grid-premium";
import { plainToInstance } from "class-transformer";
import { typData } from ".";
import useGrid from "../../Hooks/useGrid";
import { IncomingMailState } from "../../Types/dataIncoming";
import IncomingMailColumns from "./Columns/IncomingMail";
export default function DataGrid() {
  const {
    data,
    state,
    setPage,
    setPageSize,
    setFilterModel,
    setSelectionModel,
    setSortModel,
  } = useGrid(typData);
  return (
    <>
      <DataGridPremium
        autoHeight
        columns={IncomingMailColumns}
        rowCount={data.count}
        pagination
        paginationMode="server"
        sortModel={state.sortModel}
        sortingMode="server"
        pageSize={state.pageSize}
        onPageSizeChange={setPageSize}
        filterModel={state.filterModel}
        onFilterModelChange={setFilterModel}
        onPageChange={setPage}
        onSelectionModelChange={setSelectionModel}
        onSortModelChange={setSortModel}
        selectionModel={state.selectionModel}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        filterMode="server"
        keepNonExistentRowsSelected
        rows={plainToInstance(IncomingMailState, data.rows)}
      />
    </>
  );
}
