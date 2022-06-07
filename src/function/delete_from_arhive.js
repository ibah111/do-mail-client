import axios from 'axios';
import { GetCookies } from './getcookies';
import server from '../utils/server';

export default function delete_from_arhive(select, setvalu, Refresh, type) {
        if (select.length > 0) {
            axios({
                url: server() + '/Add_Arhive', method: 'POST', data: { select: select, ...GetCookies(), action: "delete", type: type }
            }).then((res) => {
                setvalu(res.data)
                Refresh()
            }).catch((e) => {
                setvalu(e.response.data);
              });
        } else 
            alert("Ни одна строка не выбрана")
            
}