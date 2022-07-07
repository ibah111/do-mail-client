import { createSlice } from "@reduxjs/toolkit";
import { DataIncomingState } from "../Types/dataIncoming";

const initialState: DataIncomingState = {
  IncomingMail: [],
  IncomingGovernmentMail: [],
  IncomingCourtMail: [],
  IncomingCourtBailiff: [],
  ArhiveIncomingMail: [],
  ArhiveIncomingGovernmentMail: [],
  ArhiveIncomingCourtMail: [],
  ArhiveIncomingCourtBailiff: [],
};
const DataIncomingSlice = createSlice({
  name: "DataIncoming",
  initialState,
  reducers: {},
});
export default DataIncomingSlice.reducer;
