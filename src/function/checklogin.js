import axios from 'axios';
import {GetCookies} from './getcookies';


const checklogin = async () => {
    const cookies = GetCookies();
    const result = await axios({
        url: 'https://apps.usb.ru:3001/login', method: 'POST', data: {...cookies}
    })
    return result.data
}


export default checklogin