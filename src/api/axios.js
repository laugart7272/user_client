import axios from 'axios';
const BASE_URL = '/api'; //import.meta.env.GO_API_URL;

export default axios.create({
    baseURL: BASE_URL,
    headers: { 
      // 'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json' 
    }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
      // 'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json' 
    },
    withCredentials: true
});