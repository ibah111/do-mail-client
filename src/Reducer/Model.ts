import {
  GridFilterModel,
  GridSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ArhiveType, MailType } from '../Types/dataIncoming';

export interface Modeler {
  filterModel: GridFilterModel;
  page: number;
  pageSize: number;
  selectionModel: GridSelectionModel;
  sortModel: GridSortModel;
}
type ArhiveState = { [key in ArhiveType]: Modeler };
type ModelState = {
  [index in MailType]: ArhiveState;
};
export const startModelState: Modeler = {
  filterModel: { items: [] },
  page: 0,
  pageSize: 25,
  selectionModel: [],
  sortModel: [],
};
const startModelsState: ArhiveState = {
  [ArhiveType.NO]: startModelState,
  [ArhiveType.ARHIVE]: startModelState,
  [ArhiveType.ARHIVE_LAW_EXEC]: startModelState,
};
const initialState: ModelState = {
  [MailType.INCOMING_MAIL]: startModelsState,
  [MailType.INCOMING_GOVERNMENT_MAIL]: startModelsState,
  [MailType.INCOMING_COURT_MAIL]: startModelsState,
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: startModelsState,
};
const ModelSlice = createSlice({
  name: 'Model',
  initialState,
  reducers: {
    setData<T extends MailType, J extends ArhiveType, K extends keyof Modeler>(
      state: Draft<ModelState>,
      action: PayloadAction<[T, J, K, Modeler[K]]>,
    ) {
      state[action.payload[0]][action.payload[1]][action.payload[2]] =
        action.payload[3];
    },
  },
});
export const { setData } = ModelSlice.actions;
export default ModelSlice.reducer;
