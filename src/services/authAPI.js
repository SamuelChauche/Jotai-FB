import { api } from './api';

export const register = async (username, email, password) => {
    return api.post('/auth/local/register', {
        username,
        email,
        password
    });
};

export const login = async (identifier, password) => {
    return api.post('/auth/local', {
        identifier,
        password
    });
};

export const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
};