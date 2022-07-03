import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface pageModelState {
  [index: number]: number;
}
const initialState: pageModelState = { 1: 0, 2: 0, 3: 0 };
const pageModel = createSlice({
  name: "pageModel",
  initialState,
  reducers: {
    setPageModel(state, action: PayloadAction<[number, number]>) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});

export const { setPageModel } = pageModel.actions;
export default pageModel.reducer;
