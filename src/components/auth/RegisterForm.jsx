import { useState } from 'react'

const RegisterForm = ({ onSubmit, loading }) => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(userData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-green-300"
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterForm