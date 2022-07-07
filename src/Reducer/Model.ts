import {
  GridFilterModel,
  GridSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import _ from "lodash";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface Modeler {
  filterModel: GridFilterModel;
  page: number;
  pageSize: number;
  selectionModel: GridSelectionModel;
  sortModel: GridSortModel;
}
interface ModelState {
  [index: string]: Modeler;
}
export const startModelState: Modeler = {
  filterModel: { items: [] },
  page: 0,
  pageSize: 25,
  selectionModel: [],
  sortModel: [],
};
const initialState: ModelState = {};
const ModelSlice = createSlice({
  name: "Model",
  initialState,
  reducers: {
    setData<K extends keyof Modeler>(
      state: Draft<ModelState>,
      action: PayloadAction<[string, K, Modeler[K]]>
    ) {
      if (state[action.payload[0]]) {
        state[action.payload[0]][action.payload[1]] = action.payload[2];
      } else {
        state[action.payload[0]] = _.cloneDeep(startModelState);
        state[action.payload[0]][action.payload[1]] = action.payload[2];
      }
    },
  },
});
export const { setData } = ModelSlice.actions;
export default ModelSlice.reducer;
