// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://willow-crescent-sec-school.onrender.com/api',
});

export default api;
