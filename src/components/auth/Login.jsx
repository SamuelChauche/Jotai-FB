import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userAtom } from '../../atoms/authAtom';
import { login } from '../../services/authAPI';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setUser = useSetAtom(userAtom);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(identifier, password);
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message
                || err.message
                || 'Identifiants incorrects';
            setError(errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Connexion</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="identifier">Email ou Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="submit-button">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;