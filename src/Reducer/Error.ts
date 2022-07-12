import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptionsObject } from "notistack";

interface ErrorState {
  text: string | null;
  params?: OptionsObject;
}
const initialState: ErrorState = {
  text: null,
};
const ErrorSlice = createSlice({
  name: "Error",
  initialState,
  reducers: {
    callError(state, action: PayloadAction<string>) {
      return { text: action.payload, params: { variant: "error" } };
    },
    callSuccess(state, action: PayloadAction<string>) {
      return { text: action.payload, params: { variant: "success" } };
    },
  },
});
export const { callError, callSuccess } = ErrorSlice.actions;
export default ErrorSlice.reducer;
