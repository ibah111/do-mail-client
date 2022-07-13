import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ArhiveType, DataIncomingState, MailType } from '../Types/dataIncoming';
export const startDataIncoming = {
  rows: [],
  count: 0,
};
const initialState: DataIncomingState = {
  [MailType.INCOMING_MAIL]: {
    [ArhiveType.NO]: startDataIncoming,
    [ArhiveType.ARHIVE]: startDataIncoming,
    [ArhiveType.ARHIVE_LAW_EXEC]: startDataIncoming,
  },
  [MailType.INCOMING_GOVERNMENT_MAIL]: {
    [ArhiveType.NO]: startDataIncoming,
    [ArhiveType.ARHIVE]: startDataIncoming,
    [ArhiveType.ARHIVE_LAW_EXEC]: startDataIncoming,
  },
  [MailType.INCOMING_COURT_MAIL]: {
    [ArhiveType.NO]: startDataIncoming,
    [ArhiveType.ARHIVE]: startDataIncoming,
    [ArhiveType.ARHIVE_LAW_EXEC]: startDataIncoming,
  },
  [MailType.INCOMING_COURT_BAILIFF_MAIL]: {
    [ArhiveType.NO]: startDataIncoming,
    [ArhiveType.ARHIVE]: startDataIncoming,
    [ArhiveType.ARHIVE_LAW_EXEC]: startDataIncoming,
  },
};
const DataIncomingSlice = createSlice({
  name: 'DataIncoming',
  initialState,
  reducers: {
    setMail<T extends MailType, K extends ArhiveType>(
      state: Draft<DataIncomingState>,
      action: PayloadAction<[T, K, DataIncomingState[T][K]]>,
    ) {
      state[action.payload[0]][action.payload[1]] = action.payload[2];
    },
  },
});
export const { setMail } = DataIncomingSlice.actions;
export default DataIncomingSlice.reducer;
