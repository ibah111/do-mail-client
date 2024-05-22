import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Reducer';
import { setReload } from '../../../Reducer/Stater';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ReloadButton() {
  const loading = useAppSelector((state) => state.Stater.loading);
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        disabled={loading}
        size="small"
        onClick={() => dispatch(setReload(true))}
        startIcon={<RefreshIcon />}
      >
        {'Обновить'}
      </Button>
    </>
  );
}
