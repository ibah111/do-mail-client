import { GridSortModel } from "@mui/x-data-grid-premium";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface sortModelState {
  [index: number]: GridSortModel;
}
const initialState: sortModelState = {
  1: [],
  2: [
    {
      field: "data_obrabotki_arhive",
      sort: "asc",
    },
  ],
  3: [
    {
      field: "data_obrabotki_arhive",
      sort: "desc",
    },
  ],
};
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
