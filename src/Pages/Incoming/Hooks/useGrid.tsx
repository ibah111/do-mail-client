import {
  GridCellEditStopParams,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { plainToInstance } from 'class-transformer';
import React from 'react';
import editCell from '../../../api/editCell';
import { useAppDispatch, useAppSelector } from '../../../Reducer';
import { setMail, startDataIncoming } from '../../../Reducer/DataIncoming';
import { Modeler, setData, startModelState } from '../../../Reducer/Model';
import { setLoading } from '../../../Reducer/Stater';
import {
  ArhiveType,
  DataIncomingState,
  DataIncomingType,
  MailType,
} from '../../../Types/dataIncoming';
import getColumns from '../Columns';
import getTransformations from '../Transformation';
export interface Grider<T extends MailType, K extends ArhiveType> {
  data: DataIncomingState[T][K];
  state: Modeler;
  columns: GridColDef<DataIncomingType[T][K]>[];
  typData: T;
  loading: boolean;
  arhive: K;
  setLoaded: (value: boolean) => void;
  setMail: (value: DataIncomingState[T][K]) => void;
  setPaginationModel: (value: GridPaginationModel) => void;
  setFilterModel: (value: GridFilterModel) => void;
  setSortModel: (value: GridSortModel) => void;
  setSelectionModel: (value: GridRowSelectionModel) => void;
  setColumnVisibilityModel: (value: GridColumnVisibilityModel) => void;
  onCellEditStop: (value: GridCellEditStopParams) => void;
}
export default function useGrid<
  T extends MailType,
  K extends ArhiveType,
>(): Grider<T, K> {
  const loading = useAppSelector((state) => state.Stater.loading);
  const typData = useAppSelector((state) => state.Stater.MailType) as T;
  const arhive = useAppSelector((state) => state.Stater.ArhiveType) as K;
  const dataIncoming = useAppSelector(
    (state) => state.DataIncoming[typData][arhive],
  );
  const [data, setResult] =
    React.useState<DataIncomingState[T][K]>(startDataIncoming);
  const state = useAppSelector((state) => state.Model[typData][arhive]);
  const dispatch = useAppDispatch();
  const setLoaded = (value: boolean) => dispatch(setLoading(!value));
  const setMailer = (value: DataIncomingState[T][K]) =>
    dispatch(setMail([typData, arhive, value]));
  const setPaginationModel = (value: GridPaginationModel) =>
    dispatch(setData([typData, arhive, 'paginationModel', value]));
  const setFilterModel = (value: GridFilterModel) =>
    dispatch(setData([typData, arhive, 'filterModel', value]));
  const setSortModel = (value: GridSortModel) =>
    dispatch(setData([typData, arhive, 'sortModel', value]));
  const setSelectionModel = (value: GridRowSelectionModel) =>
    dispatch(setData([typData, arhive, 'selectionModel', value]));
  const setColumnVisibilityModel = (value: GridColumnVisibilityModel) =>
    dispatch(setData([typData, arhive, 'columnVisibilityModel', value]));
  React.useEffect(() => {
    setResult({
      rows: plainToInstance(
        getTransformations(typData, arhive),
        dataIncoming.rows,
      ),
      count: dataIncoming.count,
    } as DataIncomingState[T][K]);
  }, [dataIncoming]);
  return {
    typData,
    data,
    loading,
    arhive,
    setLoaded,
    columns: getColumns(typData, arhive),
    state: state ? state : startModelState,
    setPaginationModel,
    setMail: setMailer,
    setFilterModel,
    setSortModel,
    setSelectionModel,
    setColumnVisibilityModel,
    onCellEditStop: (params: GridCellEditStopParams) =>
      editCell(Number(params.id), params.field, params.value),
  };
}
