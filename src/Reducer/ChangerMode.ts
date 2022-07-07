import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { DataIncomingState } from "../Types/dataIncoming";
const initialState: keyof DataIncomingState = "IncomingMail";
const ChangerModeSlice = createSlice({
  name: "ChangerMode",
  initialState,
  reducers: {
    changeMode<T extends keyof DataIncomingState>(
      state: Draft<keyof DataIncomingState>,
      action: PayloadAction<T>
    ) {
      return action.payload;
    },
  },
});
export const { changeMode } = ChangerModeSlice.actions;
export default ChangerModeSlice.reducer;
