import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { DataIncomingState } from "../Types/dataIncoming";
export type ArhiveState = 0 | 1 | 2;
export interface StaterState {
  loading: boolean;
  mode: keyof DataIncomingState;
  typeArhive: ArhiveState;
}
const initialState: StaterState = {
  loading: true,
  mode: "IncomingMail",
  typeArhive: 0,
};
const StaterSlice = createSlice({
  name: "Stater",
  initialState,
  reducers: {
    changeMode<T extends keyof DataIncomingState>(
      state: Draft<StaterState>,
      action: PayloadAction<T>
    ) {
      state.mode = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setArhive(state, action: PayloadAction<ArhiveState>) {
      state.typeArhive = action.payload;
    },
  },
});
export const { changeMode, setLoading, setArhive } = StaterSlice.actions;
export default StaterSlice.reducer;
