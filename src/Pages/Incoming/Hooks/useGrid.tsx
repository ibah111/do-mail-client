import {
  GridCellEditCommitParams,
  GridColumns,
  GridFilterModel,
  GridSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { plainToInstance } from 'class-transformer';
import editCell from '../../../api/editCell';
import { useAppDispatch, useAppSelector } from '../../../Reducer';
import { setMail } from '../../../Reducer/DataIncoming';
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
  columns: GridColumns<DataIncomingType[T][K]>;
  typData: T;
  loading: boolean;
  arhive: K;
  setLoaded: (value: boolean) => void;
  setMail: (value: DataIncomingState[T][K]) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setFilterModel: (value: GridFilterModel) => void;
  setSortModel: (value: GridSortModel) => void;
  setSelectionModel: (value: GridSelectionModel) => void;
  onCellEditCommit: (value: GridCellEditCommitParams) => void;
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
  const data = {
    rows: plainToInstance(
      getTransformations(typData, arhive),
      dataIncoming.rows,
    ),
    count: dataIncoming.count,
  } as DataIncomingState[T][K];
  const state = useAppSelector((state) => state.Model[typData][arhive]);
  const dispatch = useAppDispatch();
  const setLoaded = (value: boolean) => dispatch(setLoading(!value));
  const setMailer = (value: DataIncomingState[T][K]) =>
    dispatch(setMail([typData, arhive, value]));
  const setPage = (value: number) =>
    dispatch(setData([typData, arhive, 'page', value]));
  const setPageSize = (value: number) =>
    dispatch(setData([typData, arhive, 'pageSize', value]));
  const setFilterModel = (value: GridFilterModel) =>
    dispatch(setData([typData, arhive, 'filterModel', value]));
  const setSortModel = (value: GridSortModel) =>
    dispatch(setData([typData, arhive, 'sortModel', value]));
  const setSelectionModel = (value: GridSelectionModel) =>
    dispatch(setData([typData, arhive, 'selectionModel', value]));
  return {
    typData,
    data,
    loading,
    arhive,
    setLoaded,
    columns: getColumns(typData, arhive),
    state: state ? state : startModelState,
    setPage,
    setMail: setMailer,
    setPageSize,
    setFilterModel,
    setSortModel,
    setSelectionModel,
    onCellEditCommit: (params: GridCellEditCommitParams) =>
      editCell(Number(params.id), params.field, params.value),
  };
}
