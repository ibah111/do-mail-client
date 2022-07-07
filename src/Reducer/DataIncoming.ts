import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { DataIncomingState } from "../Types/dataIncoming";

const initialState: DataIncomingState = {
  IncomingMail: { rows: [], count: 0 },
  IncomingGovernmentMail: { rows: [], count: 0 },
  IncomingCourtMail: { rows: [], count: 0 },
  IncomingCourtBailiff: { rows: [], count: 0 },
  ArhiveIncomingMail: { rows: [], count: 0 },
  ArhiveIncomingGovernmentMail: { rows: [], count: 0 },
  ArhiveIncomingCourtMail: { rows: [], count: 0 },
  ArhiveIncomingCourtBailiff: { rows: [], count: 0 },
};
const DataIncomingSlice = createSlice({
  name: "DataIncoming",
  initialState,
  reducers: {
    setMail<T extends keyof DataIncomingState>(
      state: Draft<DataIncomingState>,
      action: PayloadAction<[T, DataIncomingState[T]]>
    ) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});
export const { setMail } = DataIncomingSlice.actions;
export default DataIncomingSlice.reducer;
