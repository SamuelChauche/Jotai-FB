import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../atoms/authAtom';
import { logout } from '../services/authAPI';

const Navbar = () => {
    const [user] = useAtom(userAtom);
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">MiniRéseau</Link>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <div className="navbar-user">
                            <Link to={`/profile/${user.id}`} className="profile-link">
                                <span className="username">{user.username}</span></Link>
                                <button onClick={handleLogout} className="logout-button">Déconnexion</button>
                        </div>
                    ) : (
                        <div className="navbar-auth">
                            <Link to="/login" className="auth-link">Connexion</Link>
                            <Link to="/register" className="auth-link">Inscription</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;