import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import DataIncoming from './DataIncoming';
import User from './User';
import Error from './Error';
import Model from './Model';
import Stater from './Stater';

export const store = configureStore({
  reducer: {
    User,
    Stater,
    DataIncoming,
    Error,
    Model,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
