import { useState } from 'react'

const LoginForm = ({ onSubmit, loading }) => {
    const [credentials, setCredentials] = useState({
        identifier: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(credentials)
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-form-title"></h2>

            <div className="form-group">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    name="identifier"
                    value={credentials.identifier}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="submit-button"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>


    )
}

export default LoginForm