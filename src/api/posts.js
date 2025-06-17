import api from '../utils/api'

export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts?populate=user')
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export const createPost = async (postData) => {
    try {
        const response = await api.post('/api/posts', { 
            text: postData.text,
            author: postData.author
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}