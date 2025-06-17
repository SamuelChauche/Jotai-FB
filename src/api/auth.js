import api from '../utils/api'
// import { setAuthToken } from '../utils/auth'

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/local/register', {
            username: userData.username,
            password: userData.password
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/local', {
            identifier: credentials.identifier, // Email ou username
            password: credentials.password
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export const getMe = async () => {
    try {
        const token = localStorage.getItem('jwt');
        if (!token) throw new Error('No JWT token found');

        const response = await api.get('/users/me', {
            params: { populate: '*' },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in getMe:', error);
        // Nettoyage du token si invalide
        if (error.response?.status === 401 || error.response?.status === 400) {
            localStorage.removeItem('jwt');
        }
        throw error.response?.data || error;
    }
};