import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.serratec.mwmsoftware.com',
  timeout: 10000, // Se a API demorar mais de 10 segundos, cancela a requisição (UX)
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenAcesso");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;