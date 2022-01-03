import axios from 'axios'

export const EditCells = async(value, coockie) => {
    const Result = await axios({
        url: 'https://apps.usb.ru:3001/edit', method: 'POST', data: {value, ...coockie}
    })
    return Result.data
}