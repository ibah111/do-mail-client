import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ArhiveType, MailType } from '../Types/dataIncoming';
export interface StaterState {
  loading: boolean;
  MailType: MailType;
  ArhiveType: ArhiveType;
  reload: boolean;
}
const initialState: StaterState = {
  loading: true,
  MailType: MailType.INCOMING_MAIL,
  ArhiveType: 0,
  reload: true,
};
const StaterSlice = createSlice({
  name: 'Stater',
  initialState,
  reducers: {
    changeMode(state: Draft<StaterState>, action: PayloadAction<MailType>) {
      state.MailType = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setArhive(state, action: PayloadAction<ArhiveType>) {
      state.ArhiveType = action.payload;
    },
    setReload(state, action: PayloadAction<boolean>) {
      state.reload = action.payload;
    },
  },
});
export const { changeMode, setLoading, setArhive, setReload } =
  StaterSlice.actions;
export default StaterSlice.reducer;
