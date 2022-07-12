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
  },
});
export const { callError } = ErrorSlice.actions;
export default ErrorSlice.reducer;
