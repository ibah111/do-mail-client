import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { blue } from '@mui/material/colors';
import { GetCookies } from "../function/getcookies"
import React from "react";
import axios from 'axios';
import server from '../utils/server';

export const Admin = ({select, setvalu, setadopen, sd, Refresh }) => {
    const [user, setuser] = React.useState("")
    const [da, sda] = React.useState("Дата/Время")
    const [com, setcom] = React.useState(0)
    const [role, setrole] = React.useState(1);
    const NeawLogin = (e) => {
        setuser(e.target.value);
    }
    const choose = (e) => {
        setrole(e.target.value)
    }
    const Add = () => {
        if (role !== 0) {
            axios({
                url: server() + '/newUser', method: 'POST', data: { user, role, ...GetCookies() }
            }).then((resu) => {
                setvalu(resu.data)
            })
        } else {
            alert('Поле с логином не заполнено')
        }
    }
    const Delete = () => {
        if (select.length > 0) {
            axios({
                url: server() + '/Delete', method: 'POST', data: { select:select, ...GetCookies() }
            }).then((resu) => {
                setvalu(resu.data)
                Refresh();
            }).catch(()=>setvalu({Result:"error", Code:"109", Message:"Сервер не смог обработать запрос"}))
        } else
            alert('Ни одна запись выбрана')
    }

    return (
        <React.Fragment>
            <TextField label="Логин" size="small" onChange={NeawLogin} />
            {user.length > 11 &&
                <FormControl size="small" sx={{ width: '20vh' }}>
                    <InputLabel id="age-label">Роль</InputLabel>
                    <Select labelId="age-label" id="age" label="Роль" value={role} onChange={choose}>
                        <MenuItem value={1}>Администратор</MenuItem>
                        <MenuItem value={2}>Редактор</MenuItem>
                        <MenuItem value={3}>Эл.архив</MenuItem>
                    </Select>
                </FormControl>}
            <Button variant="contained" sx={{ backgroundColor: blue[300] }} onClick={Add}>Добавить</Button>
            <Button variant="contained" color="success" onClick={Delete}>Удалить запись</Button>
            {/* <Button variant="contained" color="success">Выгрузить в excel</Button> */}
            <Button variant="contained" color="success" onClick={() => {
                if (com === 0) {
                    sd("dateTime")
                    sda("Дата")
                    setcom(1)
                } else {
                    sd("date")
                    sda("Дата/Время")
                    setcom(0)
                }

            }}>{da}</Button>
            <Button variant="contained" color="error" onClick={() => setadopen(0)}>Закрыть</Button>
        </React.Fragment>
    )
}