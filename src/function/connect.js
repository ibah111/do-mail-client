import axios from 'axios';

export const getDatab = async (token, filter, page, columns, limit, sort) => {
    const Data = await axios({
        url: "http://192.168.0.20:1228/data", method: 'POST', data: { ...token, filter, page, columns, limit, sort}
    })
        return Data.data
}
