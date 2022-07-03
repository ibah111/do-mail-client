import { GridSortModel } from "@mui/x-data-grid-premium";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface sortModelState {
  [index: number]: GridSortModel;
}
const initialState: sortModelState = { 1: [], 2: [], 3: [] };
const sortModel = createSlice({
  name: "sortModel",
  initialState,
  reducers: {
    setSortModel(state, action: PayloadAction<[number, GridSortModel]>) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});

export const { setSortModel } = sortModel.actions;
export default sortModel.reducer;
