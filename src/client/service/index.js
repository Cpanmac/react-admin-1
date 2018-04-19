import axios from 'axios'

export const userService = {
    getUserInfo: params => axios.post('/userInfo'),
};

export const resultService = {
    getResultData: params => axios.post('/result')
};