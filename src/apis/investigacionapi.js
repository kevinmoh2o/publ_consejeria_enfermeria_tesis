import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL;

const investigacionApi = axios.create({
    baseURL: apiUrl
})

export default investigacionApi