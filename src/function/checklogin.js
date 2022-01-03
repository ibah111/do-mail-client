import axios from 'axios';

const checklogin = async (token, login) => {
    const result = await axios({
        url: 'https://apps.usb.ru:3001/login', method: 'POST', data: { token: token, name: login }
    })
    return result.data
}


export default checklogin