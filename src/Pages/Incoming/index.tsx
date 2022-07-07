import React from "react";
import getGrid from "../../api/getGrid";
import useGrid from "./Hooks/useGrid";
import DataGrid from "./DataGrid";
import { Paper } from "@mui/material";
export default function Incoming() {
  const { state, setMail, typData, setLoaded } = useGrid();
  React.useEffect(() => {
    setLoaded(false);
    getGrid().then((res) => {
      setMail(res);
      setLoaded(true);
    });
  }, [typData, state.filterModel, state.page, state.pageSize, state.sortModel]);
  return (
    <>
      <Paper>
        <DataGrid />
      </Paper>
    </>
  );
}
