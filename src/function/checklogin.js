import axios from 'axios';

const checklogin = async (token, login) => {
    const result = await axios({
        url: 'http://192.168.0.20:1228/login', method: 'POST', data: { token: token, name: login }
    })
    return result.data
}


export default checklogin