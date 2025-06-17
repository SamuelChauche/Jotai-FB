import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPosts, createPost } from '../api/posts'

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchPosts()
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addPost = createAsyncThunk(
    'posts/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const response = await createPost(postData)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(getPosts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.loading = false
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Create Post
            .addCase(addPost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload)
                state.loading = false
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default postsSlice.reducer