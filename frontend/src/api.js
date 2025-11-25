// frontend/src/api.js
import axios from 'axios';

const fallbackBaseURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://willow-crescent-sec-school.onrender.com/api';

const baseURL = (process.env.REACT_APP_API_URL || fallbackBaseURL).trim();

// Allow frontend to target different API hosts per environment
const api = axios.create({ baseURL });

export default api;
