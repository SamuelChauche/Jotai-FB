import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import postsReducer from './postsReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})