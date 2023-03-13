import {
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ArhiveType, MailType } from '../Types/dataIncoming';

export interface Modeler {
  filterModel: GridFilterModel;
  paginationModel: GridPaginationModel;
  selectionModel: GridRowSelectionModel;
  sortModel: GridSortModel;
  columnVisibilityModel: GridColumnVisibilityModel;
}
type ArhiveState = { [key in ArhiveType]: Modeler };
type ModelState = {
  [index in MailType]: ArhiveState;
};
export const startModelState: Modeler = {
  filterModel: { items: [] },
  selectionModel: [],
  sortModel: [],
  columnVisibilityModel: {},
  paginationModel: {
    page: 0,
    pageSize: 25,
  },
};
const startModelsState: ArhiveState = {
  [ArhiveType.NO]: startModelState,
  [ArhiveType.ARHIVE]: {
    ...startModelState,
    sortModel: [{ field: 'data_obrabotki_arhive', sort: 'asc' }],
  },
  [ArhiveType.ARHIVE_LAW_EXEC]: {
    ...startModelState,
    sortModel: [{ field: 'data_obrabotki_arhive', sort: 'asc' }],
  },
};
const initialState: ModelState = {
  [MailType.INCOMING_MAIL]: startModelsState,
  [MailType.INCOMING_GOVERNMENT_MAIL]: startModelsState,
  [MailType.INCOMING_COURT_MAIL]: startModelsState,
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: startModelsState,
  [MailType.INCOMING_COURT_BAILIFF_MAIL2]: startModelsState,
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
