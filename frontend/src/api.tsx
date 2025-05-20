import axios from 'axios';

const api = axios.create({
    baseURL: "https://nhl-radar-backend.onrender.com/"
})

export default api