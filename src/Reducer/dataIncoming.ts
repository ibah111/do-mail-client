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
const dataIncomingSlice = createSlice({
  name: "dataIncoming",
  initialState,
  reducers: {},
});
export default dataIncomingSlice.reducer;
