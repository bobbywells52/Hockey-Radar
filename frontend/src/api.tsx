import axios from "axios";

const API_URL =
	import.meta.env.VITE_API_ENV === "dev"
		? "http://127.0.0.1:8000/"
		: "https://nhl-radar-backend.onrender.com/";

const api = axios.create({
	baseURL: API_URL,
});

export default api;
