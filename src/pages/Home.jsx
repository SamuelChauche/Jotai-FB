import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return (
        <div className="hero-section">
            <h1 className="hero-title">Welcome to SocialApp</h1>
            {isAuthenticated ? (
                <Link to="/posts" className="hero-button">
                    View Posts
                </Link>
            ) : (
                <div className="hero-actions">
                    <Link to="/login" className="login-button">
                        Login
                    </Link>
                    <Link to="/register" className="register-button">
                        Register
                    </Link>
                </div>
            )}
        </div>

    )
}

export default Home