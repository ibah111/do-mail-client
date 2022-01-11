import { Button, TextField, Box } from "@mui/material";
import { grey, blue, green } from '@mui/material/colors';
import React from "react";
import axios from 'axios';
import server from '../utils/server';

export const Admin = ({setvalu}) => {
    const [user, setuser] = React.useState()
    const [admin, setadmin] = React.useState()
    const NeawRed = (e) => {
        setuser(e.target.value);
    }
    const NeawAdm = (e) => {
        setadmin(e.target.value);
    }
    const Add_edit = () => {
        if (user === undefined || user === null || user === "" || user === ' ') {
            alert("Поле с редактором не заполнено")
        } else {
            axios({
                url: server()+'/neweditor', method: 'POST', data: { user: user }
            }).then(resu => setvalu(resu.data))
        }
    }

    const Add_admin = () => {
        if (admin === undefined || admin === null || admin === "" || admin === ' ') {
            alert("Поле с редактором не заполнено")
        } else {
            axios({
                url: server()+'/newadmin', method: 'POST', data: { user: admin }
            }).then(resu => setvalu(resu.data))
        }
    }

    return (
        <Box sx={{ backgroundColor: grey[300], padding: 1 }}>
            <TextField label="Добавить редактора" size="small" onChange={NeawRed}></TextField>
            <Button variant="contained" sx={{ backgroundColor: blue[300] }} onClick={Add_edit}>Добавить</Button>
            <TextField label="Добавить администратора" size="small" onChange={NeawAdm}></TextField>
            <Button variant="contained" sx={{ backgroundColor: blue[300] }} onClick={Add_admin}>Добавить</Button>
            <Button variant="contained" sx={{ backgroundColor: blue[300] }}>Удалить запись</Button>
            <Button variant="contained" sx={{ backgroundColor: green[300] }}>Выгрузить в excel</Button>
        </Box>
    )
}