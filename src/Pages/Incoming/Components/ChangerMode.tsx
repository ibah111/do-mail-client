import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { changeMode } from "../../../Reducer/ChangerMode";

export default function ChangerMode() {
  const changerMode = useAppSelector((state) => state.ChangerMode);
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={() => dispatch(changeMode("IncomingMail"))}
      >
        Входящая почта
      </Button>
      <Button
        size="small"
        variant="outlined"
        onClick={() => dispatch(changeMode("IncomingGovernmentMail"))}
      >
        Госпочта
      </Button>
    </>
  );
}
