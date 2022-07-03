import { GridFilterModel } from "@mui/x-data-grid-premium";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterModelState {
  [index: number]: GridFilterModel;
}
const initialState: filterModelState = {
  1: { items: [] },
  2: { items: [] },
  3: { items: [] },
};
const filterModel = createSlice({
  name: "filterModel",
  initialState,
  reducers: {
    setFilterModel(state, action: PayloadAction<[number, GridFilterModel]>) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});

export const { setFilterModel } = filterModel.actions;
export default filterModel.reducer;
