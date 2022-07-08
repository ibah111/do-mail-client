import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { changeMode } from "../../../../Reducer/Stater";
import { DataIncomingState } from "../../../../Types/dataIncoming";
interface CustomButtonProps<T> {
  mode: T;
  children: React.ReactNode;
}
export default function CustomButton<T extends keyof DataIncomingState>({
  mode,
  children,
}: CustomButtonProps<T>) {
  const changerMode = useAppSelector((state) => state.Stater.ChangerMode);
  const dispatch = useAppDispatch();
  return (
    <Button
      size="small"
      variant={changerMode === mode ? "outlined" : "contained"}
      onClick={() => dispatch(changeMode(mode))}
    >
      {children}
    </Button>
  );
}
