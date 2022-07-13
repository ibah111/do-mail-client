import React from 'react';
import getGrid from '../../api/getGrid';
import useGrid from './Hooks/useGrid';
import DataGrid from './DataGrid';
import { Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setReload } from '../../Reducer/Stater';
export default function Incoming() {
  const { data, arhive, state, setMail, typData, setLoaded } = useGrid();
  const dispatch = useAppDispatch();
  const reload = useAppSelector((state) => state.Stater.reload);
  React.useEffect(() => {
    dispatch(setReload(true));
  }, [arhive, typData]);
  React.useEffect(() => {
    dispatch(setReload(true));
  }, [state.filterModel, state.page, state.pageSize, state.sortModel]);
  React.useEffect(() => {
    if (reload) {
      dispatch(setReload(false));
      setLoaded(false);
      getGrid().then((res) => {
        setMail(res);
        setLoaded(true);
      });
    }
  }, [reload]);
  return (
    <>
      <Paper>
        <div style={{ display: 'flex', height: '95vh' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid />
          </div>
        </div>
      </Paper>
    </>
  );
}
