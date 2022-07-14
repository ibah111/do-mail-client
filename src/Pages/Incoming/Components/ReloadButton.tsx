import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Reducer';
import { setReload } from '../../../Reducer/Stater';

export default function ReloadButton() {
  const loading = useAppSelector((state) => state.Stater.loading);
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        disabled={loading}
        size="small"
        onClick={() => dispatch(setReload(true))}
      >
        {' '}
        Обновить
      </Button>
    </>
  );
}
