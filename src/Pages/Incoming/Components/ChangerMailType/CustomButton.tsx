import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../Reducer';
import { changeMode } from '../../../../Reducer/Stater';
import { MailType } from '../../../../Types/dataIncoming';
interface CustomButtonProps<T extends MailType> {
  value: T;
  children: React.ReactNode;
}
export default function CustomButton<T extends MailType>({
  value,
  children,
}: CustomButtonProps<T>) {
  const MailType = useAppSelector((state) => state.Stater.MailType);
  const dispatch = useAppDispatch();
  return (
    <Button
      size="small"
      variant={MailType === value ? 'outlined' : 'contained'}
      onClick={() => dispatch(changeMode(value))}
    >
      {children}
    </Button>
  );
}
