import { api } from './api';

export const fetchPosts = async () => {
    const response = await api.get('/posts?populate=*');
    return response.data.data;
};

export const createPost = async (content, userId) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const response = await api.post('/posts', {
        data: {
            text:content,
            author:userId          
        }
    })
    return response.data.data
};

export const likePost = async (postId) => {
    return api.post(`/posts/${postId}/like`);
};