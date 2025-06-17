import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authReducer'

const Navbar = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    SocialApp
                </Link>
                <div className="navbar-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/posts" className="nav-link">
                                Posts
                            </Link>
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="login-button">
                                Login
                            </Link>
                            <Link to="/register" className="register-button">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>


    )
}

export default Navbar