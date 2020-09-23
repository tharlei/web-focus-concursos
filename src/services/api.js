import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-focus-concursos.herokuapp.com/api',
  timeout: 12000,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default api;