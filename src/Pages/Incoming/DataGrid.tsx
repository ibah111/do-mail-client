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
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { setReload } from '../../Reducer/Stater';
import UseTypeDialog from './Hooks/useTypeDialog';
import React from 'react';
import UpdateDocType from '../../api/UpdateDocType';

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
      value: 'Судебная работа',
    },
    {
      id: 2,
      value: 'Исполнительное производство',
    },
  ];
  const [type, setType] = React.useState<number>(0);
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
  const handleDocTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as unknown as number);
  };
  const condition = (): boolean => {
    if (type) return false;
    return true;
  };
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
            setType(0);
          }}
          fullWidth
        >
          <DialogTitle align="center">{`Какой тип документа у ${incomingId}`}</DialogTitle>
          <Divider />
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="doc-type">{'Тип документа'}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Тип документа"
                //@ts-ignore
                value={type}
                onChange={handleDocTypeChange}
              >
                <MenuItem>{'Не выбрано'}</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Tooltip
              title={<Typography>{'Изменить тип документа'}</Typography>}
            >
              <Button
                disabled={condition()}
                variant="contained"
                color="success"
                onClick={() =>
                  UpdateDocType({
                    incoming_id: incomingId,
                    doc_type: type,
                  }).then(() => {
                    handleCloseTypeDialog();
                    dispatch(setReload(true));
                  })
                }
              >
                {'Готово!'}
              </Button>
            </Tooltip>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCloseTypeDialog()}
            >
              {'Отмена'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
