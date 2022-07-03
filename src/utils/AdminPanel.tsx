import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { GetCookies } from "../function/getcookies";
import React from "react";
import axios from "axios";
import server from "./server";
import { Result } from "../Page/Main";
import { GridSelectionModel } from "@mui/x-data-grid-premium";
interface AdminProps {
  select: GridSelectionModel;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  setAdminOpen: React.Dispatch<React.SetStateAction<number>>;
  setTypeDate: React.Dispatch<React.SetStateAction<string>>;
  Refresh: () => void;
}
export default function AdminPanel({
  select,
  setResult,
  setAdminOpen,
  setTypeDate,
  Refresh,
}: AdminProps) {
  const [user, setuser] = React.useState("");
  const [da, sda] = React.useState("Дата/Время");
  const [com, setcom] = React.useState(0);
  const [role, setrole] = React.useState(1);
  const NeawLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuser(event.target!.value);
  };
  const choose = (event: SelectChangeEvent<number>) => {
    setrole(Number(event.target.value));
  };
  const Add = () => {
    if (role !== 0) {
      axios({
        url: server() + "/newUser",
        method: "POST",
        data: { user, role, ...GetCookies() },
      })
        .then((resu) => {
          setResult(resu.data);
        })
        .catch((resu) => {
          setResult(resu.response.data);
        });
    } else {
      alert("Поле с логином не заполнено");
    }
  };
  const Delete = () => {
    if (select.length > 0) {
      axios({
        url: server() + "/Delete",
        method: "POST",
        data: { select: select, ...GetCookies() },
      })
        .then((resu) => {
          setResult(resu.data);
          Refresh();
        })
        .catch(() =>
          setResult({
            Result: "error",
            Code: "109",
            Message: "Сервер не смог обработать запрос",
          })
        );
    } else alert("Ни одна запись выбрана");
  };

  return (
    <React.Fragment>
      <TextField label="Логин" size="small" onChange={NeawLogin} />
      {user.length > 11 && (
        <FormControl size="small" sx={{ width: "20vh" }}>
          <InputLabel id="age-label">Роль</InputLabel>
          <Select
            labelId="age-label"
            id="age"
            label="Роль"
            value={role}
            onChange={choose}
          >
            <MenuItem value={1}>Администратор</MenuItem>
            <MenuItem value={2}>Редактор</MenuItem>
            <MenuItem value={3}>Эл.архив</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button
        variant="contained"
        sx={{ backgroundColor: blue[300] }}
        onClick={Add}
      >
        Добавить
      </Button>
      <Button variant="contained" color="success" onClick={Delete}>
        Удалить запись
      </Button>
      {/* <Button variant="contained" color="success">Выгрузить в excel</Button> */}
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          if (com === 0) {
            setTypeDate("dateTime");
            sda("Дата");
            setcom(1);
          } else {
            setTypeDate("date");
            sda("Дата/Время");
            setcom(0);
          }
        }}
      >
        {da}
      </Button>
      <Button variant="contained" color="error" onClick={() => setAdminOpen(0)}>
        Закрыть
      </Button>
    </React.Fragment>
  );
}
