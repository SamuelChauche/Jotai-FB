import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/authReducer'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    )

    const handleSubmit = async (credentials) => {
        dispatch(loginUser(credentials))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/posts')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {error && <div className="login-error">{error.message}</div>}
            <LoginForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );

}

export default Login