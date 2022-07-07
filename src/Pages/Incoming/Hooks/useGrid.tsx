import {
  GridColumns,
  GridFilterModel,
  GridSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { setMail } from "../../../Reducer/DataIncoming";
import { Modeler, setData, startModelState } from "../../../Reducer/Model";
import { DataIncomingState } from "../../../Types/dataIncoming";
import Columns from "../Columns";
import Transformation from "../Transformation";
export interface Grider<T extends keyof DataIncomingState> {
  data: DataIncomingState[T];
  state: Modeler;
  columns: GridColumns;
  typData: T;
  setMail: (value: DataIncomingState[T]) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setFilterModel: (value: GridFilterModel) => void;
  setSortModel: (value: GridSortModel) => void;
  setSelectionModel: (value: GridSelectionModel) => void;
}
export default function useGrid<
  T extends keyof DataIncomingState
>(): Grider<T> {
  const typData = useAppSelector((state) => state.ChangerMode) as T;
  const typDataString = typData as string;
  const dataIncoming = useAppSelector((state) => state.DataIncoming[typData]);
  const data: DataIncomingState[T] = {
    rows: plainToInstance(Transformation[typDataString], dataIncoming.rows),
    count: dataIncoming.count,
  };
  const state = useAppSelector((state) => state.Model[typData]);
  const dispatch = useAppDispatch();
  const setMailer = (value: DataIncomingState[T]) =>
    dispatch(setMail([typData, value]));
  const setPage = (value: number) =>
    dispatch(setData([typData, "page", value]));
  const setPageSize = (value: number) =>
    dispatch(setData([typData, "pageSize", value]));
  const setFilterModel = (value: GridFilterModel) =>
    dispatch(setData([typData, "filterModel", value]));
  const setSortModel = (value: GridSortModel) =>
    dispatch(setData([typData, "sortModel", value]));
  const setSelectionModel = (value: GridSelectionModel) =>
    dispatch(setData([typData, "selectionModel", value]));
  return {
    typData,
    data,
    columns: Columns[typDataString],
    state: state ? state : startModelState,
    setPage,
    setMail: setMailer,
    setPageSize,
    setFilterModel,
    setSortModel,
    setSelectionModel,
  };
}
