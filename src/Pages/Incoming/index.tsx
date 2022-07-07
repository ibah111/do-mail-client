import React from "react";
import getGrid from "../../api/getGrid";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { setMail } from "../../Reducer/DataIncoming";
import { DataIncomingState } from "../../Types/dataIncoming";
import DataGrid from "./DataGrid";
export const typData = "IncomingMail";
export default function Incoming() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.Model[typData]);
  React.useEffect(() => {
    getGrid(typData).then((res) => {
      dispatch(setMail([typData, res]));
    });
  }, [state]);
  return (
    <>
      <DataGrid />
    </>
  );
}
