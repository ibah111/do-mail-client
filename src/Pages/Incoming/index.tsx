import React from "react";
import getGrid from "../../api/getGrid";
import useGrid from "./Hooks/useGrid";
import DataGrid from "./DataGrid";
export default function Incoming() {
  const { state, setMail, typData } = useGrid();
  React.useEffect(() => {
    getGrid().then((res) => {
      setMail(res);
    });
  }, [typData, state.filterModel, state.page, state.pageSize, state.sortModel]);
  return (
    <>
      <DataGrid />
    </>
  );
}
