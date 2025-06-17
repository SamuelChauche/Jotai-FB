import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    api.interceptors.response.use(
        response => response,
        error => {
            console.error('API Error:', error.response);
            return Promise.reject(error);
        }
    );
    const token = localStorage.getItem('jwt');

    // Ne pas ajouter le header d'autorisation pour les endpoints publics
    const publicEndpoints = ['/auth/local', '/auth/local/register'];
    const isPublic = publicEndpoints.some(endpoint => config.url.includes(endpoint));

    if (token && !isPublic) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});