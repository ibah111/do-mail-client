import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import filterModel from "./filterModel";
import pageModel from "./pageModel";
import selectionModel from "./selectionModel";
import sortModel from "./sortModel";
import User from "./User";

export const store = configureStore({
  reducer: {
    filterModel,
    pageModel,
    selectionModel,
    sortModel,
    User,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
