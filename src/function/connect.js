import axios from 'axios';

export const getDatab = async (token, filter, page, columns, limit, sort) => {
    const Data = await axios({
        url: "https://apps.usb.ru:3001/data", method: 'POST', data: { ...token, filter, page, columns, limit, sort}
    })
        return Data.data
}
