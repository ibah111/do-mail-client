import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Reducer";
import { ArhiveState, setArhive } from "../../../../Reducer/Stater";

const arhives: string[] = ["Нет", "Документы", "Исполнительные документы"];
export default function Arhive() {
  const arhive = useAppSelector((state) => state.Stater.ArhiveType);
  const dispatch = useAppDispatch();
  return (
    <>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id={"label-arhive"}>Архив</InputLabel>
        <Select
          labelId="label-arhive"
          label="Архив"
          value={arhive}
          size="small"
          onChange={(event) => {
            dispatch(setArhive(Number(event.target.value) as ArhiveState));
          }}
        >
          {arhives.map((value, index) => (
            <MenuItem key={index} value={index}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
