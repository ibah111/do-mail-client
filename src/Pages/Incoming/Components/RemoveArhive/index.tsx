import { Button } from '@mui/material';
import removeArhive from '../../../../api/removeArhive';

export default function RemoveArhive() {
  return (
    <>
      <Button size="small" onClick={removeArhive}>
        Удалить из архива
      </Button>
    </>
  );
}
