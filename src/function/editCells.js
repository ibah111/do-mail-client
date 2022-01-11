import axios from 'axios'
import server from '../utils/server';

export const EditCells = async(value, coockie) => {
    const Result = await axios({
        url: server()+'/edit', method: 'POST', data: {value, ...coockie}
    })
    return Result.data
}