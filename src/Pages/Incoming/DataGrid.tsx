import { DataGridPremium } from '@mui/x-data-grid-premium';
import useGrid from './Hooks/useGrid';
import Toolbar from './Components/Toolbar';
import CustomPagination from '../../Components/CustomPagination';
import DetailData from './Components/DetailData';
import _ from 'lodash';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { setReload } from '../../Reducer/Stater';
import UseTypeDialog from './Hooks/useTypeDialog';
import React from 'react';

export enum DataGridEventsEnum {
  OpenTypeDialog = 'OpenTypeDialog',
}
export class DataGridEvents<Value = number | string | object> extends Event {
  value: Value | undefined;
  constructor(type: DataGridEventsEnum, value?: Value) {
    super(type);
    this.value = value;
  }
}

export default function DataGrid() {
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  const dispatch = useAppDispatch();
  const types = [
    {
      id: 1,
      value: 'Исполнительный лист',
    },
    {
      id: 2,
      value: 'Судебный приказ',
    },
  ];
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

  const { openTypeDialog, incomingId, handleCloseTypeDialog } = UseTypeDialog({
    DialogTarget,
  });
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
          row.Docs?.length && (
            <DetailData
              docs={row.Docs}
              api_data={{
                mail_id: row.id,
                //@ts-ignore
                law_id: row.id_dela,
                doc_type: row.doc_type,
              }}
              DialogTrigger={DialogTarget}
            />
          )
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
      {openTypeDialog && (
        <Dialog
          open={openTypeDialog}
          onClose={() => {
            handleCloseTypeDialog();
            dispatch(setReload(true));
          }}
          fullWidth
        >
          <DialogTitle align="center">{`Какой тип документа у ${incomingId}`}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <Select>
                {types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={() => {}}>
              {'Done'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
