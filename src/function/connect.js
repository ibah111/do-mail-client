import axios from 'axios';
import server from '../utils/server';

export const getDatab = async (token, filter, page, columns, limit, sort, mode, type, activBtn) => {
    const Data = await axios({
        url: server()+"/data", method: 'POST', data: { ...token, filter, page, columns, limit, sort, arhive:mode, type:type, mode: activBtn}
    })
        return Data.data
}
