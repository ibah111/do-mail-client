import axios from 'axios'

export const EditCells = async(value, coockie) => {
    const Result = await axios({
        url: 'http://192.168.0.20:1228/edit', method: 'POST', data: {value, ...coockie}
    })
    return Result.data
}