import axios from 'axios'

const API_URL = 'http://localhost:1337/api' // Remplacez par votre URL Strapi

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Intercepteur REQUÊTE (ajoute le token)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Intercepteur RÉPONSE (gère les erreurs)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwt');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;