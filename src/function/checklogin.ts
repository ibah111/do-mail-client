import axios from 'axios';
import {GetCookies} from './getcookies';
import server from '../utils/server';


const checklogin = async () => {
    const cookies = GetCookies();
    const result = await axios({
        url: server()+'/login', method: 'POST', data: {...cookies}
    })
    return result.data
}


export default checklogin