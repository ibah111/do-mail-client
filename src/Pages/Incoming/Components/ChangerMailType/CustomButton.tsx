import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../Reducer';
import { changeMode } from '../../../../Reducer/Stater';
import { MailType } from '../../../../Types/dataIncoming';
interface CustomButtonProps<T extends MailType> {
  value: T;
  children: React.ReactNode;
  disabled?: boolean;
}
export default function CustomButton<T extends MailType>({
  value,
  children,
  disabled,
}: CustomButtonProps<T>) {
  const MailType = useAppSelector((state) => state.Stater.MailType);
  const dispatch = useAppDispatch();
  return (
    <Button
      disabled={disabled}
      size="small"
      variant={MailType === value ? 'outlined' : 'contained'}
      onClick={() => dispatch(changeMode(value))}
    >
      {children}
    </Button>
  );
}
