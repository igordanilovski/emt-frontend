import axios from "axios"

const axiosConnectionInstance = axios.create({
    baseURL: 'https://igor-emt-backend.herokuapp.com',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default axiosConnectionInstance;