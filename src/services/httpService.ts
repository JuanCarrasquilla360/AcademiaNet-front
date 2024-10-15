import axios from "axios";

const baseURL = "https://localhost:7241/api/";
export const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar el interceptor para manejar el token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem("jwtToken");

    // Si existe un token, lo agregamos a los headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Manejo de errores antes de que la solicitud sea enviada
    return Promise.reject(error);
  }
);

// Agregar el interceptor de respuesta para manejar errores globales, como tokens expirados
axiosInstance.interceptors.response.use(
  (response) => {
    // Simplemente retornamos la respuesta si todo está bien
    return response;
  },
  (error) => {
    // Manejo de errores como un token expirado o inválido
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 (no autorizado), como redirigir al usuario a la página de login
      // Puedes también eliminar el token y redirigir:
      localStorage.removeItem("jwtToken");
      window.location.href = "/login"; // Redirige a la página de inicio de sesión
    }

    return Promise.reject(error);
  }
);

const httpService = {
  get: async (url: string, params = null) => {
    const response = await axiosInstance.get(`${url}`, { params });
    return response.data;
  },
  post: async (url: string, data) => {
    const response = await axiosInstance.post(`${url}`, data);
    return response.data;
  },
  put: async (url: string, data) => {
    const response = await axiosInstance.put(`${url}`, data);
    return response.data;
  },
  delete: async (url: string) => {
    const response = await axiosInstance.delete(`${url}`);
    return response.data;
  },
};

export default httpService;
