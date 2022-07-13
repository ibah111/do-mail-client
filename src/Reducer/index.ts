import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import DataIncoming from './DataIncoming';
import User from './User';
import Message from './Message';
import Model from './Model';
import Stater from './Stater';

export const store = configureStore({
  reducer: {
    User,
    Stater,
    DataIncoming,
    Message,
    Model,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
