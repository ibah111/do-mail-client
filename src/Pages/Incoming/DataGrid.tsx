import { DataGridPremium } from '@mui/x-data-grid-premium';
import useGrid from './Hooks/useGrid';
import Toolbar from './Components/Toolbar';
import CustomPagination from '../../Components/CustomPagination';
import DetailData from './Components/DetailData';
import _ from 'lodash';
export default function DataGrid() {
  const {
    loading,
    columns,
    data,
    state,
    setPaginationModel,
    setFilterModel,
    setSelectionModel,
    setSortModel,
    processRowUpdate,
    setColumnVisibilityModel,
  } = useGrid();
  return (
    <>
      <DataGridPremium
        columns={columns}
        rowCount={data.count}
        columnBuffer={columns.length}
        pagination
        loading={loading}
        paginationMode="server"
        sortModel={state.sortModel}
        sortingMode="server"
        paginationModel={state.paginationModel}
        onPaginationModelChange={setPaginationModel}
        processRowUpdate={processRowUpdate}
        filterModel={state.filterModel}
        onFilterModelChange={setFilterModel}
        onRowSelectionModelChange={setSelectionModel}
        onSortModelChange={setSortModel}
        rowSelectionModel={state.selectionModel}
        getDetailPanelContent={({ row }) =>
          row.Docs?.length && <DetailData docs={row.Docs} />
        }
        getDetailPanelHeight={() => 'auto'}
        checkboxSelection={true}
        disableRowSelectionOnClick={true}
        columnVisibilityModel={state.columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
        slots={{
          toolbar: Toolbar,
          pagination: CustomPagination,
        }}
        filterMode="server"
        keepNonExistentRowsSelected
        rows={data.rows}
      />
    </>
  );
}
