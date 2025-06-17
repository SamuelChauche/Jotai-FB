import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setAuthToken } from '../utils/auth'
import { register, login, getMe } from '../api/auth'

// Création des thunks
export const registerUser = createAsyncThunk(
    '/api/auth/local/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await register(userData)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    '/api/auth/local',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await login(credentials)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const loadUser = createAsyncThunk(
    '/api/users/me',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getMe('/users/me')
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



// export const loadUser = () => async (dispatch) => {
//     try {
//         // 1. Vérification du token avant la requête
//         const token = localStorage.getItem('jwt');
//         if (!token) throw new Error('No token found');

//         // 2. Requête corrigée avec le bon endpoint
//         const response = await api.get('/users/me', {
//             params: {
//                 populate: '*'  // Correctement formaté comme paramètre
//             },
//             headers: {
//                 Authorization: `Bearer ${token}`  // Header explicite
//             }
//         });

//         // 3. Vérification de la réponse
//         if (!response.data) throw new Error('Invalid user data');
        
//         dispatch({
//             type: 'userLoaded',
//             payload: response.data
//         });

//     } catch (error) {
//         console.error('Error loading user:', error);
//         localStorage.removeItem('jwt');  // Nettoyage du token invalide
//         dispatch({
//             type: 'authError',
//             payload: error.message
//         });
//         throw error;
//     }
// };



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        logout(state) {
            state.user = null
            state.isAuthenticated = false
            setAuthToken(null)
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.loading = false
                setAuthToken(action.payload.jwt)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                setAuthToken(null)
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.loading = false
                setAuthToken(action.payload.jwt)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                setAuthToken(null)
            })
            // Load User
            .addCase(loadUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.loading = false
            })
            .addCase(loadUser.rejected, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.loading = false
                setAuthToken(null)
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer