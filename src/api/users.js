import api from '../utils/api'

export const fetchUser = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}?populate=*`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const response = await api.put(`/users/${userId}`, userData)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchUserPosts = async (userId) => {
    try {
        const response = await api.get(`/posts?filters[user][id][$eq]=${userId}&populate=*`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};