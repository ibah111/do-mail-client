import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../Reducer';
import { changeMode } from '../../../../Reducer/Stater';
import { MailType } from '../../../../Types/dataIncoming';
interface CustomButtonProps<T extends MailType> {
  mode: T;
  children: React.ReactNode;
}
export default function CustomButton<T extends MailType>({
  mode,
  children,
}: CustomButtonProps<T>) {
  const changerMode = useAppSelector((state) => state.Stater.MailType);
  const dispatch = useAppDispatch();
  return (
    <Button
      size="small"
      variant={changerMode === mode ? 'outlined' : 'contained'}
      onClick={() => dispatch(changeMode(mode))}
    >
      {children}
    </Button>
  );
}
