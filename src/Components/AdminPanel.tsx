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
import React from "react";
import axios from "axios";
import server from "../utils/server";
import { Result } from "../Page/Main";
import { GridSelectionModel } from "@mui/x-data-grid-premium";
import { getToken } from "../utils/getToken";
import { useAppSelector } from "../Reducer";
interface AdminProps {
  select: GridSelectionModel;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  setTypeDate: React.Dispatch<React.SetStateAction<string>>;
  Refresh: () => void;
}
export default function AdminPanel({
  select,
  setResult,
  setTypeDate,
  Refresh,
}: AdminProps) {
  const [user, setuser] = React.useState("");
  const [da, sda] = React.useState("Дата/Время");
  const [com, setcom] = React.useState(0);
  const [role, setrole] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const User = useAppSelector((state) => state.User);
  const NewLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        data: { user, role, ...getToken() },
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
        data: { select: select, ...getToken() },
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
      {User.roles.includes("admin") &&
        (open ? (
          <>
            <TextField label="Логин" size="small" onChange={NewLogin} />
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
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Закрыть
            </Button>
          </>
        ) : (
          <Button
            color="success"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Админка
          </Button>
        ))}
    </React.Fragment>
  );
}
