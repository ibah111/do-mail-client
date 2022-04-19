import axios from 'axios';
import { GetCookies } from './getcookies';
import server from '../utils/server';

export default function (select, number, setvalu, Refresh, type, setOpenD) {
        if (number !== null && number !== "") {
            axios({
                url: server() + '/Add_Arhive', method: 'POST', data: { select: select, ...GetCookies(), action: "corob", number: number, type: type }
            }).then((res) => {
                setvalu(res.data)
                Refresh()
                setOpenD(false);
            }).catch(() => { setvalu({ Result: "error", Code: "109", Message: "При отправке произошёл сбой" }) })
        } else
            alert("Номер короба не указан")
}