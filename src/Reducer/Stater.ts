import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { DataIncomingState } from "../Types/dataIncoming";
interface StaterState {
  loading: boolean;
  mode: keyof DataIncomingState;
}
const initialState: StaterState = {
  loading: true,
  mode: "IncomingMail",
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
  },
});
export const { changeMode, setLoading } = StaterSlice.actions;
export default StaterSlice.reducer;
