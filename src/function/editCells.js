import axios from 'axios'
import server from '../utils/server';

export const EditCells = async(value, coockie, columns) => {
    console.log(value.value);
    console.log(typeof value.value)
    try {
    const Result = await axios({
        url: server()+'/edit', method: 'POST', data: {value, ...coockie, columns:columns}
    })
    return Result.data
} catch (e) {
    return e.response.data;
  }
}