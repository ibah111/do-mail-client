import {
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { plainToInstance } from 'class-transformer';
import { updatedDiff } from 'deep-object-diff';
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
import { filterOperatorsString } from '../Components/Filter/filterOperators';
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
  processRowUpdate: (
    row: DataIncomingType[T][K],
    old: DataIncomingType[T][K],
  ) => DataIncomingType[T][K];
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
  const preloadColumns = React.useMemo(
    () => getColumns(typData, arhive),
    [typData, arhive],
  );
  const columns = React.useMemo(
    () =>
      preloadColumns.map((col) =>
        col.type === 'string' || col.type === undefined
          ? { ...col, filterOperators: filterOperatorsString }
          : col,
      ),
    [preloadColumns],
  );
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
    columns,
    state: state ? state : startModelState,
    setPaginationModel,
    setMail: setMailer,
    setFilterModel,
    setSortModel,
    setSelectionModel,
    setColumnVisibilityModel,
    processRowUpdate: (row, old) => {
      const changed = updatedDiff(old, row) as DataIncomingType[T][K];
      for (const key1 of Object.keys(changed) as (keyof typeof changed)[]) {
        if (
          typeof changed[key1] === 'object' &&
          !(changed[key1] instanceof Date)
        ) {
          for (const key2 of Object.keys(
            changed[key1] as object,
          ) as (keyof (typeof changed)[typeof key1])[]) {
            editCell(
              Number(row.id),
              key2 as string,
              [changed[key1][key2]],
              (key1 as string) + '.',
            );
          }
        } else editCell(Number(row.id), key1 as string, changed[key1]);
      }
      return row;
    },
  };
}
