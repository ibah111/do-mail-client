import {
  GridFilterModel,
  GridSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import { useAppDispatch, useAppSelector } from "../Reducer";
import { setData, startModelState } from "../Reducer/Model";

export default function useGrid(typData: string) {
  const data = useAppSelector((state) => state.DataIncoming.IncomingMail);
  const state = useAppSelector((state) =>
    state.Model[typData] ? state.Model[typData] : startModelState
  );
  const dispatch = useAppDispatch();
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
    data,
    state,
    setPage,
    setPageSize,
    setFilterModel,
    setSortModel,
    setSelectionModel,
  };
}
