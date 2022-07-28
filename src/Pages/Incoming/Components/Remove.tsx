import { Button } from '@mui/material';
import remove from '../../../api/remove';

export default function Remove() {
  return (
    <>
      <Button size="small" onClick={remove}>
        Удалить
      </Button>
    </>
  );
}
