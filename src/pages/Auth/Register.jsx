import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/authReducer'
import RegisterForm from '../../components/auth/RegisterForm'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    )

    const handleSubmit = async (userData) => {
        dispatch(registerUser(userData))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/posts')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <RegisterForm onSubmit={handleSubmit} loading={loading} />
        </div>
    )
}

export default Register