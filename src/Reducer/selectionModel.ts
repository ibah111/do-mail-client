import { GridSelectionModel } from "@mui/x-data-grid-premium";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface selectionModelState {
  [index: number]: GridSelectionModel;
}
const initialState: selectionModelState = { 1: [], 2: [], 3: [] };
const selectionModel = createSlice({
  name: "selectionModel",
  initialState,
  reducers: {
    setSelectionModel(
      state,
      action: PayloadAction<[number, GridSelectionModel]>
    ) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});

export const { setSelectionModel } = selectionModel.actions;
export default selectionModel.reducer;
