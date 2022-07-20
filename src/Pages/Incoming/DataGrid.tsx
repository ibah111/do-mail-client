import { DataGridPremium } from '@mui/x-data-grid-premium';
import useGrid from './Hooks/useGrid';
import Toolbar from './Components/Toolbar';
import CustomPagination from '../../Components/CustomPagination';
import React from 'react';
export default function DataGrid() {
  const {
    loading,
    columns,
    data,
    state,
    setPage,
    setPageSize,
    setFilterModel,
    setSelectionModel,
    setSortModel,
    onCellEditCommit,
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
        pageSize={state.pageSize}
        page={state.page}
        onCellEditCommit={onCellEditCommit}
        onPageSizeChange={setPageSize}
        filterModel={state.filterModel}
        onFilterModelChange={setFilterModel}
        onPageChange={setPage}
        onSelectionModelChange={setSelectionModel}
        onSortModelChange={setSortModel}
        selectionModel={state.selectionModel}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        columnVisibilityModel={state.columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
        components={{
          Toolbar: Toolbar,
          Pagination: CustomPagination,
        }}
        filterMode="server"
        keepNonExistentRowsSelected
        rows={data.rows}
      />
    </>
  );
}
