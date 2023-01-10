import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }

  return Promise.reject(response);
});

export default instance;
