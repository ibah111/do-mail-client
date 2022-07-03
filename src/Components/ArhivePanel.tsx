import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import AddBox from "../function/AddBox";
import RemoveBox from "../function/RemoveBox";
import { Result } from "../Page/Main";
import { useAppSelector } from "../Reducer";
import Arhive from "./Arhive";
interface ArhivePanelProps {
  type: number;
  choose_type: (e: SelectChangeEvent<number>) => void;
  currentTab: number;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  typeArhive: number;
  Refresh: () => void;
  setVkladka: (val: number) => void;
}
export default function ArhivePanel({
  type,
  choose_type,
  currentTab,
  setResult,
  typeArhive,
  setVkladka,
  Refresh,
}: ArhivePanelProps) {
  const User = useAppSelector((state) => state.User);
  const select = useAppSelector((state) => state.selectionModel);
  const [openDialogArhive, setOpenDialogArhive] = React.useState(false);
  const [num, setNum] = React.useState<number>(0);
  return (
    <>
      {User.roles.includes("arhive") && (
        <>
          <FormControl size="small" sx={{ width: "13vh" }} color="secondary">
            <InputLabel id="age-label">Тип</InputLabel>
            <Select
              labelId="age-label"
              id="age"
              label="Тип"
              value={type}
              onChange={choose_type}
            >
              <MenuItem value={1}>Обычные</MenuItem>
              <MenuItem value={2}>ИД</MenuItem>
            </Select>
          </FormControl>

          {typeArhive === 0 ? (
            <>
              {" "}
              <Arhive
                select={select[currentTab]}
                setResult={setResult}
                typeArhive={type}
              />{" "}
            </>
          ) : (
            <>
              <>
                {" "}
                <Button
                  color="secondary"
                  onClick={() => {
                    if (select[currentTab].length > 0)
                      setOpenDialogArhive(true);
                    else alert("Ни одна строка не выбрана");
                  }}
                  variant="contained"
                >
                  Внесение в короб
                </Button>{" "}
              </>{" "}
              <React.Fragment>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    RemoveBox(select[currentTab], setResult, Refresh, type)
                  }
                >
                  Убрать из архива
                </Button>
              </React.Fragment>{" "}
            </>
          )}
          <Button
            color="secondary"
            variant="outlined"
            onClick={
              typeArhive === 0 ? () => setVkladka(1) : () => setVkladka(0)
            }
          >
            {typeArhive === 0 ? "Перейти в архив" : "Вернуться в Почту"}
          </Button>
        </>
      )}

      <Dialog
        open={openDialogArhive}
        onClose={() => setOpenDialogArhive(false)}
      >
        <DialogTitle>Внесение</DialogTitle>
        <DialogContent>
          <DialogContentText>Впишите номер короба</DialogContentText>
          <TextField
            onChange={(e) => {
              setNum(Number(e.target.value));
            }}
            autoFocus
            label="№ Короба"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogArhive(false)} color="error">
            Закрыть
          </Button>
          <Button
            onClick={() =>
              AddBox(
                select[currentTab],
                num,
                setResult,
                Refresh,
                type,
                setOpenDialogArhive
              )
            }
            color="success"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
