import React from "react";
import getGrid from "../../api/getGrid";
import useGrid from "../../Hooks/useGrid";
import { IncomingMailState } from "../../Types/dataIncoming";
import DataGrid from "./DataGrid";
export const typData = "IncomingMail";
export default function Incoming() {
  const { state, setMail } = useGrid(typData);
  React.useEffect(() => {
    getGrid(typData).then((res) => {
      console.log(res);
      setMail(res);
    });
  }, [state.filterModel, state.page, state.pageSize, state.sortModel]);
  return (
    <>
      <DataGrid />
    </>
  );
}
