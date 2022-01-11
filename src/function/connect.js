import axios from 'axios';
import server from '../utils/server';

export const getDatab = async (token, filter, page, columns, limit, sort) => {
    const Data = await axios({
        url: server()+"/data", method: 'POST', data: { ...token, filter, page, columns, limit, sort}
    })
        return Data.data
}
